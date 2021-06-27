// 1. 找到一个入口文件
// 2. 解析这个入口文件，提取它的依赖
// 3. 解析入口文件依赖的依赖，递归的区创建一个文件间的依赖图，描述所有文件的依赖关系
// 4. 把所有文件打包成一个文件

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const babel = require('babel-core');

// 因为ID是全局的，所以要保证唯一
let ID = 0;
function createAssets(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = babylon.parse(content, {
        sourceType: 'module'
    });
    const dependencies = [];
    traverse(ast, {
        ImportDeclaration: (({ node }) => {
            dependencies.push(node.source.value);
        })
    });
    const id = ID++;
    // 创建源代码
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['env']
    });
    return {
        id,
        filename,
        dependencies,
        code
    };
    // console.log(ast.program.body);

}

function createGraph(entry) {
    const mainAssets = createAssets(entry);
    const allAsset = [mainAssets];
    for (const asset of allAsset) {
        // 拿到目录名
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};
        // 遍历依赖
        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            const childAsset = createAssets(absolutePath);
            asset.mapping[relativePath] = childAsset.id;
            allAsset.push(childAsset);
        });
    }
    return allAsset;
}


const graph = createGraph('./source/entry.js');

function bundle (graph) {
    // 最后的代码是一个字符串
    let modules = '';
    graph.forEach(module => {
        modules += `${module.id}:[
            function (require, module, exports) {
                ${module.code}
            },
            ${JSON.stringify(module.mapping)}
        ],`;
    });
    const result = `
        (function (modules) {
            function require(id) {
                const [fn, mapping] = modules[id];
                // 传递给后面引入自己的各种以来
                function localRequire(relativePath) {
                    return require(mapping[relativePath])
                }

                const module = {exports: {}};
                fn(localRequire, module, module.exports);
                return module.exports;
            }

            require(0);
        })({${modules}})
    `;
    return result;
}
const result = bundle(graph);
console.log(result);
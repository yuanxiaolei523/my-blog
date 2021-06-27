module.exports = {
    mode: 'production',
    entry: {
        // 这种情况下产生的还是一个chunk
        // index: ['./src/index.js', './src/add.js']
        // 下面这种情况会有两个chunk，因为有devtool，所以会有四个bundle(dist文件中的就是bundle) 
        index: './src/index.js',
        other: './src/multiply.js'
    },
    output: {
        filename: '[name].js'
    },
    // devtool: 'source-map', // 会产生两个bundle
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                commons:{
                    chunks: 'initial',
                    minChunks: 2, // 如果两个文件用到了同一行，那么就生成一个chunk
                    minSize: 0 //提出来的commonChunk最小的体积为0时才能生成一个chunk
                },
                vendor: { // 打包第三方包
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    }
};

/*
    产生的chunk
    1. entry index
    2. entry other
    3. runtimeChunk: 'single'
    4. splitChunks common
    5. splitChunks vendor
*/
// 浏览器是否支持webp

function checkWebp() {
    try {
        document
            .createElement('canvas')
            .toDataURL('image/webp')
            .indexOf('data:image/webp') === 0;
    } catch (e) {
        return false;
    }
}
// 怎么通过一个短连接转换为webp

const supportWebp = checkWebp();
export function getWebpImageUrl(url) {
    // url为空
    if (!url) {
        throw new Error('url不能为空');
    }
    // url是否是webp格式
    if (url.startsWith('data:')) {
        return url;
    }
    // 浏览器是否支持webp
    if (!supportWebp) {
        return url;
    }
    return (url = '7x-oss-sdksdsd');
}

function checkWebp() {
    try {
        return document.createElement('canvas')
            .toDataURL('image/webp')
            .indexOf('data:image/webp') === 0;
    } catch (error) {
        return false;
    }
}

const supportWebp = checkWebp();


export function getWebpImageUrl(url) {
    if (!url) {
        throw new Error('url为空');
    }
    // 如果传入的url还是base64格式的，那么拼接就会报错
    if (url.startsWith('data:')) {
        return url;
    }
    // 如果不支持webp，那么拼接也会报错
    if (!supportWebp) {
        return url;
    }
    return url + '?x-oss-xxxx';
}


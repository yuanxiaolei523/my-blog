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
        throw new Error('url为空')
    }
    if (url.startsWith('data:')) {
        return url;
    }
    if (!supportWebp) {
        return url;
    }
    return url + '?x-oss-xxxx';

}
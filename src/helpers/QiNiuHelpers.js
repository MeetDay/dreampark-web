
export function appendQiNiuQueryParamsForImageUrl(
    imageUrl,
    { mode=2, w=420, h=200, interlace=1, q=75} = {}) {
    return `${imageUrl}?imageView2/${mode}/w/${w}/interlace/1`
}

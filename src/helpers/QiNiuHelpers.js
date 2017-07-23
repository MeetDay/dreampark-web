
export function covertImageUrl(imageUrl) {
    
}

export default function QiNiuHelper(imageUrl, option) {
    this.imageUrl = imageUrl;
}

QiNiuHelper.prototype.formatImageUrl = function(imageUrl) {
    const helper = new QiNiuHelper(imageUrl)

}

QiNiuHelper.prototype.setImageMode = function(mode=0) {
    this.imageUrl = `${this.imageUrl}/${mode}`;
}

QiNiuHelper.prototype.setWidthFactor = function(w) {
    this.imageUrl = `${this.imageUrl}/w/${w}`;
}

QiNiuHelper.prototype.setHeightFactor = function(h=210) {
    this.imageUrl = `${this.imageUrl}/h/${h}`;
}

QiNiuHelper.prototype.setInterlace = function(interlace=0) {
    this.imageUrl = `${this.imageUrl}/interlace/${interlace}`;
}

QiNiuHelper.prototype.setQuality = function(quality=75) {
    this.imageUrl = `${this.imageUrl}/q/${quality}`;
}

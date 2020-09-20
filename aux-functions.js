function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
function randomColor() {
    var R = Math.floor(randomRange(0, 255));
    var G = Math.floor(randomRange(0, 255));
    var B = Math.floor(randomRange(0, 255));
    var a = randomRange(0.1, 1);
    return R,G,B,a
}

function aquaColorPalette() {
    aquaArray = [
        '#012421',
        '#04453f',
        '#08544d',
        '#0e6159',
        '#16756c',
        '#218279',
        '#2f8f86',
        '#419c93',
        '#54a8a0',
        '#66b3ab',
        '#79bab3',
        '#86bfb9',
        '#95c2bd',
        '#abd1cd',
        '#bee6e1',
    ]
    
    var color = aquaArray[Math.floor(randomRange(0,aquaArray.length))]
    // console.log(color)
    return color
}

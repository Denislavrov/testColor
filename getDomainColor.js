'use strict';
window.onload = function () {

function getColor(imgSrc) {
    const stepSize =  5;
    const defaultColor = { r: 0, g: 0, b: 0};
    const canvas = document.querySelector('#testCanvas');
    const context = canvas.getContext('2d');
    const sticky = new Image();
    let data, width, height;
    let i = -4;
    let dataLength;
    const rgb = {r: 0, g: 0, b: 0};
    let count = 0;
    let backgroundColorStyle = document.querySelector('.colorMarker');

    if(!context) {
        return defaultColor;
    }

    // height = canvas.height =  sticky.naturalHeight || sticky.offsetHeight || sticky.height;
    // width = canvas.width = sticky.naturalWidth || sticky.offsetWidth  || sticky.width;

    sticky.src = imgSrc;
    sticky.onload = () => {
        //context.drawImage(sticky, 0, 0, sticky.width, sticky.height);
        context.drawImage(sticky, 0, 0, 300, 150);

        try {
            data = context.getImageData(0, 0, 300, 150);
        } catch (e) {
            return defaultColor;
        }

        dataLength = data.data.length;
        
        while ((i += stepSize * 4) < dataLength) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        rgb.r = parseInt((rgb.r/count));
        rgb.g = parseInt((rgb.g/count));
        rgb.b = parseInt((rgb.b/count));


        getTextColor(backgroundColorStyle.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    };
}

function getTextColor(backgroundColor) {
    const colorMarker =  document.querySelector('.colorMarker');
    let rgb = colorMarker.style.backgroundColor = backgroundColor;
    let colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    let brightness = 3;

    console.log(colors, 'colors');
    let r = colors[1];
    let g = colors[2];
    let b = colors[3];

    let ir = Math.floor((255 - r) * brightness);
    let ig = Math.floor((255 - g) * brightness);
    let ib = Math.floor((255 - b) * brightness);

    return colorMarker.style.color = `rgb(${ir}, ${ig}, ${ib})`;
}

getColor('img/img4.jpg');
};
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
    sticky.src = imgSrc;
    sticky.onload = () => {
         //height = canvas.height =  sticky.naturalHeight || sticky.offsetHeight || sticky.height;
         //width = canvas.width = sticky.naturalWidth || sticky.offsetWidth  || sticky.width;

        context.drawImage(sticky, 0, 0, 298, 168);

        try {
            data = context.getImageData(0, 0, 298, 168);
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
        return backgroundColorStyle.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`;
    };
}

// function getTextColor(backgroundColor) {
//     const colorMarker =  document.querySelector('.colorMarker');
//     let rgb = colorMarker.style.backgroundColor = backgroundColor;
//     let colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//     let brightness = 3;
//
//     console.log(colors, 'colors');
//     let r = colors[1];
//     let g = colors[2];
//     let b = colors[3];
//
//     let ir = Math.floor((255 - r) * brightness);
//     let ig = Math.floor((255 - g) * brightness);
//     let ib = Math.floor((255 - b) * brightness);
//
//     return colorMarker.style.color = `rgb(${ir}, ${ig}, ${ib})`;
// }

function getTextColor(backgroundColor) {
   const colorMarker = document.querySelector('.colorMarker');
   let rgb = colorMarker.style.backgroundColor = backgroundColor;
   let colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
   let r = colors[1];
   let g = colors[2];
   let b = colors[3];



   let hexColor = getHexColor(r,g,b);
   let firstNum = parseInt(hexColor.substr(1,1), 16);
   console.log(firstNum);
   if(firstNum > 4) {
       return colorMarker.style.color = `#000`;
   } else {
       return colorMarker.style.color = `#fff`;
   }
}

function componentToHex(color) {
    debugger;

    let hex = parseInt(color).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
function getHexColor(r,g,b) {
    return '#'+ componentToHex(r) + componentToHex(g) + componentToHex(b);
}

getColor('img/img6.jpg');
};
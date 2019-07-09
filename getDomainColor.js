'use strict';
window.onload = function () {

    const settings = {
        img: 'img/default/img3.jpg',
        backgroundOpacity: 0.7,
        colorsButtonKoef: 20,
        darkDefaultBGColor: '#9e9e9e',
        darkText: '#333',
        lightText: '#fff',
        canvasId: '#testCanvas',
        backgroundColorClass: 'colorMarker',
        buttonClass: 'canvas__button',
        domainClass: 'canvas__domain',
    };

    function getColor(imgSrc) {
        const stepSize = 5;
        const defaultColor = {r: 0, g: 0, b: 0};
        const canvas = document.querySelector(settings.canvasId);
        const context = canvas.getContext('2d');
        const sticky = new Image();
        let data, width, height;
        let i = -4;
        let dataLength;
        const rgb = {r: 0, g: 0, b: 0};
        let count = 0;
        let backgroundColorStyle = document.querySelector(`.${settings.backgroundColorClass}`);

        if (!context) {
            return defaultColor;
        }
        sticky.src = imgSrc;
        sticky.setAttribute('crossOrigin', '');
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

            rgb.r = parseInt((rgb.r / count));
            rgb.g = parseInt((rgb.g / count));
            rgb.b = parseInt((rgb.b / count));

            getTextColor(backgroundColorStyle.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, settings.backgroundColorClass);
            getButtonBackground(backgroundColorStyle.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            getDomainColor(backgroundColorStyle.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            return backgroundColorStyle.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${settings.backgroundOpacity})`;
        };
    }

    function getTextColor(backgroundColor, textClassName) {
        const colorMarker = document.querySelector(`.${textClassName}`);
        let rgb = colorMarker.style.backgroundColor = backgroundColor;
        let colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        let r = colors[1];
        let g = colors[2];
        let b = colors[3];


        let hexColor = getHexColor(r, g, b);
        let hexColorInt = parseInt(hexColor.substr(1, 6), 16);
        let firstNum = parseInt(hexColor.substr(1, 1), 16);
        /* цвет #A9A9A9	rgb(169, 169, 169) в 10- чной системе счисления для определения цвета текста*/
        const blackLimiter = 11119017;
        if (blackLimiter < hexColorInt) {
            return colorMarker.style.color = settings.darkText;
        } else {
            return colorMarker.style.color = settings.lightText;
        }
    }

    function getButtonBackground(backGroundColor) {
        const colorMarker = document.querySelector(`.${settings.buttonClass}`);
        const colors = backGroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        const colorsKoef = settings.colorsButtonKoef;

        let r = parseInt(colors[1], 10);
        let g = parseInt(colors[2], 10);
        let b = parseInt(colors[3], 10);

        if (r > 50 && b > 50 && b > 50) {
            getTextColor(colorMarker.style.backgroundColor = `rgb(${r - colorsKoef}, ${g - colorsKoef}, ${b - colorsKoef})`, settings.buttonClass);
            return colorMarker.style.backgroundColor = `rgb(${r - colorsKoef}, ${g - colorsKoef}, ${b - colorsKoef})`;
        } else {
            colorMarker.style.color = settings.lightText;
            return colorMarker.style.backgroundColor = settings.darkDefaultBGColor;

        }
    }

    function getDomainColor(backGroundColor) {
        const colorMarker = document.querySelector(`.${settings.domainClass}`);
        const colors = backGroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        const colorsKoef = settings.colorsButtonKoef;

        let r = parseInt(colors[1], 10);
        let g = parseInt(colors[2], 10);
        let b = parseInt(colors[3], 10);

        if (r > 50 && b > 50 && b > 50) {
            return colorMarker.style.color = `rgb(${r - colorsKoef}, ${g - colorsKoef}, ${b - colorsKoef})`;
        } else {
            return colorMarker.style.color = settings.darkDefaultBGColor;
        }
    }

    function componentToHex(color) {
        let hex = parseInt(color).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function getHexColor(r, g, b) {
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    getColor(settings.img);
};


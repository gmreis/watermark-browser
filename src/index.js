import _ from 'lodash';
import Jimp from 'jimp/es';

const button = document.querySelector("#button");

const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const font = document.querySelector("#font");

fname.addEventListener('input', _.debounce(getToRender, 400))
lname.addEventListener('input', _.debounce(getToRender, 400))
font.addEventListener('change', getToRender);
button.addEventListener('click', getToRender);

function getToRender () {
    if (lname.value.trim() == '') {
        console.log('###### renderOneLine', fname.value, font.value);
        renderOneLine(fname.value.toUpperCase(), font.value, '.image-container img');
    } else {
        console.log('###### renderTwoLine', fname.value, lname.value, font.value);
        renderTwoLine(fname.value.toUpperCase(), lname.value.toUpperCase(), font.value, '.image-container img');
    }
}


function renderOneLine(name, fontName, imageQuerySelector) {
    const imageElement = document.querySelector(imageQuerySelector);
    if (imageElement) {
        Jimp.read('watermark-browser/dist/img/unnamed.png')
        // Jimp.read('/img/untitled.png')
            .then(async unnamed => {
                const nameFont = await Jimp.loadFont('watermark-browser/dist/fonts/lato-italic/'+fontName+'.fnt')
                const rankFont = await Jimp.loadFont('watermark-browser/dist/fonts/lato-italic/lato-italic-12.fnt')

                // console.log('measureText name', Jimp.measureText(nameFont, name))
                // console.log('measureTextHeight name', Jimp.measureTextHeight(nameFont, name))

                const rankConfig = {
                    text: 'CONSULTORA',
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                };

                const companyConfig = {
                    text: 'MARY KAY',
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                }

                const nameConfig = {
                    text: name,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                };

                const contactConfig = {
                    text: '(48) 99987-6789',
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                }

                const rankImage = await unnamed.print(rankFont, 0, 30, rankConfig, 180, 0);
                const companyImage = await rankImage.print(rankFont, 0, 40, companyConfig, 180, 0);
                const contactImage = await companyImage.print(rankFont, 0, 138, contactConfig, 180, 0);
                const imageFull = await contactImage.print(nameFont, 20, 90, nameConfig, 140, 0);

                const base64 = await imageFull.getBase64Async('image/png');
                imageElement.src = base64;
            })
            .catch(err => {
                console.error(err);
            });
    }
}

function renderTwoLine(firstLine, lastLine, fontName, imageQuerySelector) {
    const imageElement = document.querySelector(imageQuerySelector);
    if (imageElement) {
        Jimp.read('watermark-browser/dist/img/unnamed.png')
        // Jimp.read('/img/untitled.png')
            .then(async unnamed => {
                const nameFont = await Jimp.loadFont('watermark-browser/dist/fonts/lato-italic/'+fontName+'.fnt')
                const rankFont = await Jimp.loadFont('watermark-browser/dist/fonts/lato-italic/lato-italic-12.fnt')

                // console.log('measureText name', Jimp.measureText(nameFont, name))
                // console.log('measureTextHeight name', Jimp.measureTextHeight(nameFont, name))

                const rankConfig = {
                    text: 'CONSULTORA',
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                };

                const companyConfig = {
                    text: 'MARY KAY',
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                }

                const contactConfig = {
                    text: '(48) 99987-6789',
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                }

                const firstLineConfig = {
                    text: firstLine,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
                };

                const lastLineConfig = {
                    text: lastLine,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
                };

                const rankImage = await unnamed.print(rankFont, 0, 30, rankConfig, 180, 0);
                const companyImage = await rankImage.print(rankFont, 0, 40, companyConfig, 180, 0);
                const contactImage = await companyImage.print(rankFont, 0, 138, contactConfig, 180, 0);

                const lastLineHeight = Jimp.measureTextHeight(nameFont, lastLine)
                const firstLineimage = await contactImage.print(nameFont, 20, 90, firstLineConfig, 140, 0);
                const imageFull = await firstLineimage.print(nameFont, 20, 90, lastLineConfig, 140, (lastLineHeight * 0.9));

                const base64 = await imageFull.getBase64Async('image/png');
                imageElement.src = base64;
            })
            .catch(err => {
                console.error(err);

            });
    }
}

getToRender();

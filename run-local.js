const Jimp = require('jimp');

async function render() {
    const unnamed = await Jimp.read('img/unnamed.png');
    const feed = await Jimp.read('img/feed.jpeg');

    const nameFont = await Jimp.loadFont('dist/fonts/lato-italic/lato-italic-bold-19.fnt')
    const rankFont = await Jimp.loadFont('dist/fonts/lato-italic/lato-italic-12.fnt')
    const contactFont = await Jimp.loadFont('dist/fonts/lato-italic/lato-italic-14.fnt')

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
        text: 'JOSÉ SILVA',
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    };

    const contactConfig = {
        text: '(48) 99987-6789',
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }

    const rankImage = await unnamed.print(rankFont, 0, 40, rankConfig, 180, 0);
    const companyImage = await rankImage.print(rankFont, 0, 52, companyConfig, 180, 0);
    const contactImage = await companyImage.print(contactFont, 0, 130, contactConfig, 180, 0);
    const imageFull = await contactImage.print(nameFont, 20, 90, nameConfig, 150, 0);

    const result = await feed.composite(imageFull, 15, 900);
    await result.write('result.png');
}

render();

import chroma from "chroma-js";

const LEVELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const colorRange = (inputHexColor) => {
    const colorWhite = "#fff";
    const darkenedInputHexColor = chroma(inputHexColor).darken(1.4).hex();

    return [darkenedInputHexColor, inputHexColor, colorWhite]
};

const generateScale = (inputHexColor, numberOfColors) => {
    return chroma.scale(colorRange(inputHexColor)).mode("lab").colors(numberOfColors);
};

const generatePalette = (inputPalette) => {
    const outputPalette = {
        paletteName: inputPalette.paletteName,
        id: inputPalette.id,
        emoji: inputPalette.emoji,
        colors: {}
    };

    LEVELS.forEach( level => outputPalette.colors[level] = []);

    for (let color of inputPalette.colors) {
        const scale = generateScale(color.color, 10).reverse();

        scale.forEach((hexColor, index) => {
            outputPalette.colors[LEVELS[index]].push({
                name: `${color.name} ${LEVELS[index]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: hexColor,
                rgb: chroma(hexColor).css(),
                rgba: chroma(hexColor).css().replace("rgb", "rgba").replace(")", ",1.0)")
            })
        });
    }

    return outputPalette;
};

export {generatePalette};
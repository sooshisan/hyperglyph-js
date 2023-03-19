import { DATA_STRING_PREFIX, DEFAULT_HYPERGLYPH_ARGS } from "./constants";
import { getMapper } from "./mappers";
import { BuildArgs, Dimension } from "./types";

const getGridHeight = (dimension: Dimension, padding: boolean): number => {
    if (dimension === 4) {
        return padding ? 55 : 41;
    } else if (dimension === 8) {
        return padding ? 110 : 80;
    } else if (dimension === 16) {
        return padding ? 220 : 160;
    } else if (dimension === 32) {
        return padding ? 440 : 320;
    } else if (dimension === 64) {
        return padding ? 880 : 640;
    }

    throw new Error(`Unrecognized dimension: ${dimension}`);
}

const getGridWidth = (dimension: Dimension, padding: boolean): number => {
    if (dimension === 4) {
        return padding ? 55 : 41;
    } else if (dimension === 8) {
        return padding ? 110 : 80;
    } else if (dimension === 16) {
        return padding ? 220 : 160;
    } else if (dimension === 32) {
        return padding ? 440 : 320;
    } else if (dimension === 64) {
        return padding ? 880 : 640;
    }

    throw new Error(`Unrecognized dimension: ${dimension}`);
}

const getStartOffset = (dimension: Dimension, padding: boolean): number => {
    if (dimension === 4) {
        return padding ? 7 : 0;
    } else if (dimension === 8) {
        return padding ? 15 : 0;
    } else if (dimension === 16) {
        return padding ? 30 : 0;
    } else if (dimension === 32) {
        return padding ? 60 : 0;
    } else if (dimension === 64) {
        return padding ? 120 : 0;
    }

    throw new Error(`Unrecognized dimension: ${dimension}`);
}

export const buildSvg = (args: BuildArgs) => {
    const hyperglyphArgs = args.hyperglyphArgs ? args.hyperglyphArgs : DEFAULT_HYPERGLYPH_ARGS;

    const lines = args.data.replace(DATA_STRING_PREFIX, "").split("%0A").filter((line) => line.length > 0);

    const includePadding = args.includePadding !== undefined ? args.includePadding : true;
    const gridHeight = getGridHeight(hyperglyphArgs.dimensions.height, includePadding);
    const gridWidth = getGridWidth(hyperglyphArgs.dimensions.width, includePadding);

    // 1 value since height === width for now
    const startOffset = getStartOffset(hyperglyphArgs.dimensions.height, includePadding);

    // todo: enable custom colors
    const backgroundColor = args.mode === 'dark' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    const strokeColor = args.mode === 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)';

    const output = [
        `<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:jfreesvg=\"http://www.jfree.org/jfreesvg/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"${gridWidth}\" height=\"${gridHeight}\" text-rendering=\"auto\" shape-rendering=\"auto\">`,
        `<rect x=\"0\" y=\"0\" width=\"${gridWidth}\" height=\"${gridHeight}\" style=\"fill: ${backgroundColor}; fill-opacity: 1.0\" transform=\"matrix(1,0,0,1,0,0)\" />`
    ];

    let y = startOffset;
    for (const line of lines) {
        let x = startOffset;

        for (let i = 0; i < line.length; i++) {
            const c = line[i];

            if (c === ".") {
                x += 10;
                continue;
            }

            const result = getMapper(c)(x, y, strokeColor);
            output.push(result.data);

            x += 10;
        }

        y += 10;
    }

    output.push("</svg>");

    return output.join("");
}

import { DATA_STRING_PREFIX, DEFAULT_HYPERGLYPH_ARGS } from "./constants";
import { Dimensions, HyperglyphArgs, SeedLength } from "./types";

const getScheme = (a: number): number => {
    const index = a % 91;

    if (index < 13) return 1;
    else if (index < 25) return 2;
    else if (index < 36) return 3;
    else if (index < 46) return 4;
    else if (index < 55) return 5;
    else if (index < 63) {
        if (a % 4 <= 1) return 6;
        return 14;
    }
    else if (index < 70) return 7;
    else if (index < 76) return 8;
    else if (index < 81) return 9;
    else if (index < 85) return 10;
    else if (index < 88) return 11;
    else if (index < 90) return 11;
    return 13;
}

export const deriveSeedFromInput = (input: string, seedLength: SeedLength): number => {
    const inputBuffer = Buffer.from(input);

    if (seedLength === 2) {
        return Number(inputBuffer.subarray(0, 2).readUint16LE());
    } else if (seedLength === 4) {
        return Number(inputBuffer.subarray(0, 4).readUint32LE());
    } else if (seedLength === 8) {
        return Number(inputBuffer.subarray(0, 8).readBigUInt64LE());
    } else if (seedLength === 16) {
        return Number(BigInt('0x' + inputBuffer.subarray(0, 16).toString('hex')));
    }

    throw new Error(`Invalid seed length: ${seedLength}`)
}

const getIndex = (i: number, j: number, c: number, dimensions: Dimensions): [number, number] => {
    let x: number;
    let y: number;

    // short-cut the number of checks we have to do based on most common paths
    if (c === 0) {
        // 0 = default, symmetrical
        x = Math.abs(2 * (i - (dimensions.width / 2)) + 1);
        y = Math.abs(2 * (j - (dimensions.height / 2)) + 1);
    } else if (c === 1) {
        // asymmetrical
        x = i;
        y = j;
    } else if (c === 2) {
        // horizontal
        x = (dimensions.width - i);
        y = i;
    } else if (c === 3) {
        // vertical
        x = (dimensions.height - j);
        y = j;
    } else {
        throw new Error(`Unrecognized class: ${c}`)
    }

    return [x, y];
}

export const generate = (
    input: string,
    hyperglyphArgs?: HyperglyphArgs
) => {
    const args = hyperglyphArgs ? hyperglyphArgs : DEFAULT_HYPERGLYPH_ARGS;

    if (args.dimensions.height !== args.dimensions.width) {
        throw new Error("Only equal height and width configuration is supported")
    }

    const seed = deriveSeedFromInput(input, args.seedLength);

    let symbolSchemeId = getScheme(seed);
    let output = DATA_STRING_PREFIX;

    let symbols: string[];
    if (symbolSchemeId === 1) symbols = [".", "O", "|", "-", "."]; // O|-
    else if (symbolSchemeId === 2) symbols = [".", "+", "-", "|", "."]; // +-|
    else if (symbolSchemeId === 3) symbols = [".", "/", "\\", ".", "."]; // /\
    else if (symbolSchemeId === 4) symbols = [".", "\\", "|", "-", "/"]; // \|-/
    else if (symbolSchemeId === 5) symbols = [".", "X", "/", "\\", "."]; // X/\
    else if (symbolSchemeId === 6) symbols = [".", "\\", ".", "\\", "."]; // \\
    else if (symbolSchemeId === 7) symbols = [".", "#", ".", "-", "+"]; // #|-+
    else if (symbolSchemeId === 8) symbols = [".", ":", "-", ".", "."]; // :-
    else if (symbolSchemeId === 9) symbols = [".", "#", ".", ".", "."]; // #
    else if (symbolSchemeId === 10) symbols = [".", "=", ".", ".", "."]; // =
    else if (symbolSchemeId === 11) symbols = [".", "O", "@", ".", "."]; // O@
    else if (symbolSchemeId === 12) symbols = [".", "#", "=", ".", "."]; // #=
    else if (symbolSchemeId === 13) symbols = [".", "O", "O", ".", "."]; // OO
    else symbols = [".", "/", ".", "/", "."]; // /

    for (let i = 0; i < args.dimensions.width; i++) {
        for (let j = 0; j < args.dimensions.height; j++) {
            const [x, y] = getIndex(i, j, args.generatorClass, args.dimensions);
            output += symbols[(x * y * seed) % 5];
        }

        output += "%0A";
    }

    return output;
}

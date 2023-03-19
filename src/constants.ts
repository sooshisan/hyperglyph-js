import { HyperglyphArgs } from "./types";

export const DATA_STRING_PREFIX = "data:text/plain;charset=utf-8,";
export const BASE_64_ENCODING_PREFIX = "data:image/svg+xml;base64,";

export const DEFAULT_HYPERGLYPH_ARGS: HyperglyphArgs = {
    dimensions: {
        height: 64,
        width: 64
    },
    seedLength: 8,
    generatorClass: 0
}
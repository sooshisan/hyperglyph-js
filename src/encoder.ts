import { BASE_64_ENCODING_PREFIX } from "./constants";
import { Encoding } from "./types";

export const toEncodedSvg = (svg: string, encoding: Encoding): string => {
    // (todo) handle other encodings?
    return BASE_64_ENCODING_PREFIX + Buffer.from(svg).toString('base64');
}

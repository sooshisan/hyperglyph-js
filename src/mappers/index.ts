import { Mapper } from "../types";
import { at } from "./at";
import { circle } from "./circle";
import { hash } from "./hash";
import { horizontal } from "./horizontal";
import { lslash } from "./lslash";
import { plus } from "./plus";
import { rslash } from "./rslash";
import { vertical } from "./vertical";
import { x } from "./x";
import { equal } from "./equal";
import { colon } from "./colon";

// const vMapper = (x: number, y: number): MapperResult => {
//     return {
//         data: `<line x1="${x}" y1="${y + 5}" x2="${x + 5}" y2="${y + 10}" style="stroke-width: 2.0;stroke: rgb(255,255,255);stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" /><line x1="${x + 5}" y1="${y + 10}" x2="${x + 10}" y2="${y + 5}" style="stroke-width: 2.0;stroke: rgb(255,255,255);stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" />`
//     };
// }

// const langleMapper = (x: number, y: number): MapperResult => {
//     return {
//         data: `<line x1="${x + 5}" y1="${y + 5}" x2="${x + 10}" y2="${y + 1}" style="stroke-width: 2.0;stroke: rgb(255,255,255);stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" /><line x1="${x + 5}" y1="${y + 5}" x2="${x + 10}" y2="${y + 9}" style="stroke-width: 2.0;stroke: rgb(255,255,255);stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" />`
//     };
// }

// const rangleMapper = (x: number, y: number): MapperResult => {
//     return {
//         data: `<line x1="${x + 5}" y1="${y + 5}" x2="${x}" y2="${y + 1}" style="stroke-width: 2.0;stroke: rgb(255,255,255);stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" /><line x1="${x + 5}" y1="${y + 5}" x2="${x}" y2="${y + 9}" style="stroke-width: 2.0;stroke: rgb(255,255,255);stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" />`
//     };
// }

const MAPPING: Record<string, Mapper> = {
    "O": circle, // open circle
    "@": at, // closed circle
    "+": plus,
    "X": x,
    "|": vertical,
    "-": horizontal,
    "\\": rslash,
    "/": lslash,
    "#": hash, // closed square
    "=": equal, // open square
    ":": colon,
    // "v": vMapper,
    // "<": langleMapper,
    // ">": rangleMapper,
}

export const getMapper = (symbol: string): Mapper => {
    if (!(symbol in MAPPING)) {
        throw new Error(`Unrecognized symbol: ${symbol}, expected one of: ${Object.keys(MAPPING)}`)
    }

    return MAPPING[symbol];
}
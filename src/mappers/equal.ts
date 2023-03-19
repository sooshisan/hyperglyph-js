import { MapperResult } from "../types";

export const equal = (x: number, y: number, color: string): MapperResult => {
    return {
        data: `<rect x="${x}" y="${y}" width="10" height="10" style="stroke-width: 2.0; stroke: ${color}; stroke-opacity: 1.0; stroke-linecap: square; fill: none" transform="matrix(1,0,0,1,0,0)" />`
    };
}

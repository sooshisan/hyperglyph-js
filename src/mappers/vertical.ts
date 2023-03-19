import { MapperResult } from "../types";

export const vertical = (x: number, y: number, color: string): MapperResult => {
    return {
        data: `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 10}" style="stroke-width: 2.0;stroke: ${color}; stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" />`
    };
}
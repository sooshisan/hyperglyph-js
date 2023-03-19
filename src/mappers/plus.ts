import { MapperResult } from "../types";

export const plus = (x: number, y: number, color: string): MapperResult => {
    return {
        data: `<line x1="${x}" y1="${y + 5}" x2="${x + 10}" y2="${y + 5}" style="stroke-width: 2.0;stroke: ${color};stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" /><line x1="${x + 5}" y1="${y}" x2="${x + 5}" y2="${y + 10}" style="stroke-width: 2.0;stroke: ${color};stroke-opacity: 1.0;stroke-linecap: square;" transform="matrix(1,0,0,1,0,0)" />`
    };
}

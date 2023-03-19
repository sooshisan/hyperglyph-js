import { MapperResult } from "../types";

export const colon = (x: number, y: number, color: string): MapperResult => {
    return {
        data: `<ellipse cx="${x + 5}" cy="${y + 2}" rx="1" ry="1" style="stroke-width: 2.0; stroke: ${color}; stroke-opacity: 1.0; stroke-linecap: square; fill: none" transform="matrix(1,0,0,1,0,0)" /><ellipse cx="${x + 5}" cy="${y + 8}" rx="1" ry="1" style="stroke-width: 2.0; stroke: ${color}; stroke-opacity: 1.0; stroke-linecap: square; fill: none" transform="matrix(1,0,0,1,0,0)" />`
    };
}

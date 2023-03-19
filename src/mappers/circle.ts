import { MapperResult } from "../types";

export const circle = (x: number, y: number, color: string): MapperResult => {
    return {
        data: `<ellipse cx="${x}" cy="${y}" rx="5" ry="5" style="stroke-width: 2.0; stroke: ${color}; stroke-opacity: 1.0; stroke-linecap: square; fill: none" transform="matrix(1,0,0,1,0,0)" />`
    };
}
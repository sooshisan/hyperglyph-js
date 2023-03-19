import { MapperResult } from "../types";

export const at = (x: number, y: number, color: string): MapperResult => {
    return {
        data: `<ellipse cx="${x}" cy="${y}" rx="5" ry="5" style="fill: ${color}; fill-opacity: 1.0" transform="matrix(1,0,0,1,0,0)" />`
    };
}
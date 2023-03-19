export type MapperResult = {
    data: string;
};

export type Mapper = (x: number, y: number, color: string) => MapperResult;

export type Encoding = 'base64';

export type SeedLength = 2 | 4 | 8 | 16;

export type Class = 0 | 1 | 2 | 3;

export type Dimension = 4 | 8 | 16 | 32 | 64;

export type Dimensions = {
    height: Dimension;
    width: Dimension;
};

export type HyperglyphArgs = {
    dimensions: Dimensions;
    seedLength: SeedLength;
    generatorClass: Class;
};

export type RenderMode = "dark" | "light";

export type BuildArgs = {
    data: string;
    mode: RenderMode;
    includePadding?: boolean;
    hyperglyphArgs?: HyperglyphArgs;
}
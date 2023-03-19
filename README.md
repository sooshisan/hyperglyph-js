# Hyperglyph-js library

Javascript code for prototyping with hyperglyph outputs.

## Usage

```typescript
import { Keypair } from "@solana/web3.js";
import { buildSvg, generate, toEncodedSvg } from "../";

const renderMode = 'dark';

// optionally: define args to generate hyperglyph; defaults are shown below
const args: HyperglyphArgs = {
    dimensions: {
        height: 64,
        width: 64,
    },
    seedLength: 8,
    generatorClass: 0
};

const data = generate(Keypair.generate().publicKey.toBase58(), args);
const svg = buildSvg(data, renderMode, args);

// optional: encode to a base64 data string
const encodedSvg = toEncodedSvg(svg, 'base64');
```

## Getting started

Run the following:

* Install pacakges `yarn`
* Build the code `yarn build`
* Run the code `yarn start`
* Check `output/` folder
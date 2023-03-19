import fs from "fs";

const { createHash } = require("crypto");
import { Keypair } from "@solana/web3.js";

import { buildSvg, generate, HyperglyphArgs, toEncodedSvg } from "../";

const createSha256 = (value: string) => createHash("sha256").update(value).digest("hex");

const output = "output";

const hashes: Record<string, number> = {};
const duplicates = [];
for (let i = 0; i < 100; i++) {

    const args: HyperglyphArgs = {
        dimensions: {
            height: 64,
            width: 64,
        },
        seedLength: 8,
        generatorClass: 0
    };

    const data = generate(Keypair.generate().publicKey.toBase58(), args);

    const svg = buildSvg({
        data,
        mode: 'dark',
        includePadding: true,
        hyperglyphArgs: args
    });

    // identify duplicates
    const hash = createSha256(toEncodedSvg(svg, 'base64'));
    if (!(hash in hashes)) {
        hashes[hash] = 1;
    } else {
        duplicates.push(i);
    }

    fs.writeFileSync(`${output}/${i}.svg`, svg);
}

console.log(`Found ${duplicates.length} duplicates: ${duplicates}`)

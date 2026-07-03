#!/usr/bin/env node
/* Rasterizes assets/og-image.svg (a hand-authored, on-brand card matching
   the site's :root color tokens) into the PNG that og:image/twitter:image
   point at. Run with `npm run og-image` after editing the SVG. */
"use strict";
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "assets", "og-image.svg");
const OUT = path.join(__dirname, "..", "assets", "og-image.png");

sharp(fs.readFileSync(SRC))
  .resize(1200, 630)
  .png({ quality: 90 })
  .toFile(OUT)
  .then(info => console.log("wrote", path.relative(process.cwd(), OUT), `${info.width}x${info.height}`, `${info.size}b`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

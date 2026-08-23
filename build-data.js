/* =========================================================
   Run this whenever you edit data.js:

       node build-data.js

   It regenerates the JSON copy of the destinations dataset
   that the serverless function reads at request time, so the
   chat AI is always working from the same data as the site.
========================================================= */

const fs = require("fs");
const path = require("path");

const { destinations } = require("./data.js");

const outPath = path.join(__dirname, "netlify", "functions", "destinations-data.json");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(destinations, null, 2));

const total = Object.values(destinations).flat().length;
console.log(`✓ Wrote ${total} destinations across ${Object.keys(destinations).length} states to ${outPath}`);
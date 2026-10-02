// Copy rule: no em dashes or en dashes anywhere in site copy. Run before every handoff: npm run check:dashes
// podcast-snapshot.json is raw feed data; dashes are stripped at render time in src/lib/podcast.ts.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SKIP = new Set(["podcast-snapshot.json"]);
const hits = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|json|css|md)$/.test(name) && !SKIP.has(name)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (/[–—]/.test(line)) hits.push(`${p}:${i + 1}: ${line.trim().slice(0, 120)}`);
      });
    }
  }
})("src");
if (hits.length) {
  console.error(`Found ${hits.length} em/en dash(es):\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("No em or en dashes in src.");

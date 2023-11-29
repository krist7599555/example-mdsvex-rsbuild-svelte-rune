import * as fs from "node:fs";
import * as path from "node:path";
import { pipe, A, F } from "@mobily/ts-belt";
import toml from "toml";

const files = pipe(
  fs.readdirSync("./content"),
  A.map((filename) => {
    const absolute_path = path.resolve("content", filename);
    const relative_path = path.relative("./src", absolute_path);
    const metadata = pipe(
      fs.readFileSync(absolute_path, { encoding: "utf-8" }),
      (str) => str.split(/---/g)[1],
      (str) => toml.parse(str),
      (rec) => ({
        publish: true,
        filename,
        sortKey: filename.split("-").map(tok => {
          const num = parseInt(tok)
          return Number.isInteger(num) ? `${num + 900000000}` : tok
        }),
        ...rec,
      })
    );
    return {
      metadata,
      filename,
      absolute_path,
      relative_path,
    };
  }),
  A.filter(it => it.metadata.publish !== false),
  A.sortBy(it => it.metadata.sortKey),
  (arr) =>
    arr.map((route, idx) => {
      return {
        ...route,
        paginate: {
          prev: arr[idx - 1]?.metadata,
          next: arr[idx + 1]?.metadata,
        },
      };
    })
);

const out = `
//! THIS FILE IS GENERATED NOT CHANGE
// prettier-ignore
export const routes = [
${files
  .map((f) => {
    return `  {
    filename: ${JSON.stringify(f.filename)},
    import: () => import(${JSON.stringify(f.relative_path)}),
    metadata: ${JSON.stringify(f.metadata)},
    paginate: ${JSON.stringify(f.paginate)},
  }`;
  })
  .join(",\n")}  
]
`;

fs.writeFileSync("./src/routes.ts", out);
console.log("DONE generate routes");

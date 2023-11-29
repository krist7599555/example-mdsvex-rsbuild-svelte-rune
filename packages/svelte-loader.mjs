import * as compiler from "svelte/compiler";

/**
 * @typedef {import("svelte/compiler").CompileOptions} LoaderOption
 */

/**
 * svete-rune-loader
 * @param {string} source svelte source code
 * @param {LoaderOption} option svelte option
 * @returns string
 */
export default async function svelteLoader(source, option) {
  const red = "\x1b[31m";
  const clearRed = "\x1b[0m";
  try {
    option ??= this.getOptions();
    option.filename = this.resourcePath
    const out = compiler.compile(source, {
      generate: "client",
      sourcemap: "inline",
      preserveComments: true,
      ...option,
    });
    return out.js.code;
  } catch (err) {
    const lineStart = err?.start?.line ?? 1;
    const lineEnd = err?.end?.line ?? lineStart;

    console.error(`${red}Error:`, "svelte-loader", err?.message, clearRed);
    console.error("  file  :", this.resourcePath); // https://www.rspack.dev/api/loader-api.html#thisresourcepath

    console.error("  start :", err?.start);
    console.error("  end   :", err?.end);
    console.error(
      source
        .split("\n")
        .map((str, idx) => {
          const lineNum = idx + 1;
          const isErrLine = lineStart <= lineNum && lineNum <= lineEnd;
          return `${
            isErrLine ? `${red}ERR ` : "    "
          }${lineNum}| ${str}${clearRed}`;
        })
        .slice(Math.max(0, lineStart - 4), lineEnd + 4)
        .join("\n")
    );
    console.log("");
    this.emitError(err);
    throw new Error("svelte-loader fail to compile", { cause: err });
  }
}

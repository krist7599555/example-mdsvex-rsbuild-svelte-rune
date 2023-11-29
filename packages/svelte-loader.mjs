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
  const out = compiler.compile(source, {
    generate: "client",
    sourcemap: "inline",
    preserveComments: true,
    ...option
  });
  return out.js.code;
}

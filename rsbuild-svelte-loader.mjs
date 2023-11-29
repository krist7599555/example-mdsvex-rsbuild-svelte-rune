import * as compiler from "svelte/compiler";

/**
 * svete-rune-loader
 * @param {string} source svelte source code
 * @returns string
 */
export default async function svelteRuneLoader(source) {
  const out = compiler.compile(source, {
    // runes: true,
    generate: "client",
    sourcemap: "inline",
    preserveComments: true,
  });
  return out.js.code;
}

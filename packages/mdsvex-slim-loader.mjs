import * as mdsvexSlim from "./mdsvex-slim-compiler.mjs";

/**
 * @typedef {mdsvexSlim.MdxsvexOption} LoaderOption
 */


/**
 * svete-rune-loader
 * @param {string} source svelte source code
 * @param {LoaderOption} option
 * @returns string
 */
export default async function mdsvexSlimLoader(source, option) {
  const out = await mdsvexSlim.compile(source, option)
  return out.code;
}

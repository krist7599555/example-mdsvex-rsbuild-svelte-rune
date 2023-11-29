import * as mdsvexSlim from "./mdsvex-slim-compiler.mjs";

/**
 * @typedef {Partial<mdsvexSlim.MdxsvexOption>} LoaderOption
 */


/**
 * svete-rune-loader
 * @param {string} source svelte source code
 * @param {LoaderOption} option
 * @returns string
 */
export default async function mdsvexSlimLoader(source, option) {
  option ??= this.getOptions()
  option.filename = this.resourcePath
  const out = await mdsvexSlim.compile(source, option)
  return out.code;
}

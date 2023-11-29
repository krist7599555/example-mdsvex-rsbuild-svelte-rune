import * as svelte from "svelte/compiler";
import * as mdsvex from "mdsvex";
import toml from "toml";
import remarkContainer from "remark-containers";

/**
 * A number, or a string containing a number.
 * @typedef {Object} CustomRemarkContainer
 * @property {string} type
 * @property {(node: import("unist").Node<{ hName: string, hProperties: any }>, config: any) => void} transform
 */

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} MdxsvexOption
 * @property {CustomRemarkContainer[]} custom_containers - Indicates whether the Courage component is present.
 * @property {(source: string) => string} inject_script - return new source
 */

/**
 * Preprocess Markdown(mdsvex) to Svelte Component
 * @param {string} source - content of markdown
 * @param {Partial<MdxsvexOption>} option - config
 * @returns {Promise<import("svelte/compiler").Processed>}
 */
export async function compile(source, option) {
  option.custom_containers ??= [];
  option.inject_script = (source) => source;

  const out = await svelte.preprocess(source, {
    // exec markup 1st
    async markup({ content }) {
      const md = await mdsvex.compile(content, {
        rehypePlugins: [
          [
            remarkContainer,
            { default: true, custom: option.custom_containers ?? [] },
          ],
        ],
        frontmatter: {
          type: "toml",
          marker: "-",
          parse(source) {
            try {
              return JSON.parse(JSON.stringify(toml.parse(source)));
            } catch (err) {
              throw new Error("Parse TOML Frontmatter Error", { cause: err });
            }
          },
        },
      });

      // add empty <script> if not exists
      if (md.code.match(/<script/g).length != 2) {
        md.code = md.code.replace(
          "</script>",
          `</script>\n<script lang="ts"></script>`
        );
      }
      return {
        code: md.code,
        map: md.map,
      };
    }, // markup end
    async script({ content, attributes }) {
      if (attributes.context !== "module") {
        content = option.inject_script
          ? option.inject_script(content)
          : content;
      }
      return { code: content };
    },
  }); // preprocess end

  return {
    code: out.code,
    map: out.map,
    attributes: out.attributes,
    dependencies: out.dependencies,
  };
}

import * as svelte from "svelte/compiler";
import * as mdsvex from "mdsvex";
import MagicString from "magic-string";
import toml from "toml";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkContainer from "remark-containers";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import remarkPrettier from 'remark-prettier';
// import "remark-frontmatter"
/// <reference types="remark-frontmatter" />

/** @param {string} source TOML */
const tomlParse = (source) => {
  try {
    return JSON.parse(JSON.stringify(toml.parse(source)));
  } catch(err) {
    throw new Error('Parse TOML Frontmatter Error', { cause: err })
  }
}


/** @type {typeof import("./mdsvex-slim").compile} */
export async function compile(source) {
  const out = await svelte.preprocess(source, {
    // exec markup 1st
    async markup({ content }) { 
      const md = await mdsvex.compile(content, {
        rehypePlugins: [
          [
            remarkContainer,
            {
              default: true,
              custom: [
                // prettier-ignore
                ...[
                  { type: "nice", hName: "Chat", hProperties: { people: "น้องไนซ์", color: "#ffe1a6" }, },
                  { type: "mom", hName: "Chat", hProperties: { people: "แม่นก", color: "#ffd3fa" }, },
                  { type: "member", hName: "Chat", hProperties: { people: "สมาชิก", color: "#e0e0ff" }, },
                  { type: "chat", hName: "Chat", hProperties: { color: "#d3f3cc" }, },
                ].map(({ type, hName, hProperties }) => ({
                  type: type,
                  /**
                   * @param {import("hast").Parent} node
                   * @param {string} config
                   * @returns {undefined}
                   */
                  transform(node, config) {
                    node.data.hName = hName;
                    node.data.hProperties = { people: config ?? "นิรนาม", ...hProperties };
                  },
                })),
              ],
            },
          ],
        ],
        frontmatter: {
          type: "toml",
          marker: "-",
          parse: (s) => tomlParse(s),
        },
      });

      if ((md.code).match(/<script/g).length != 2) {
        md.code = md.code.replace("</script>", `</script>\n<script lang="ts"></script>`)
      }

      md.code = md.code.replaceAll(
        /^(\s*)(export const metadata|const {.*} = metadata)/gms,
        (_, _1, _2) => _2
      );
      md.code = md.code.replaceAll(
        /<\/script>(\s*)<script/g,
        "</script>\n\n<script"
      );
      return {
        code: md.code,
        map: md.map,
      };
    }, // markup end
    async script({ content, attributes }) {
      if (attributes.context !== "module") {
        content = [`\nimport Chat from '../src/Chat.svelte';`, content].join('\n')
      }
      return { code: content }
    }
  }); // preprocess end

  return {
    code: out.code,
    map: out.map,
    attributes: out.attributes,
    dependencies: out.dependencies,
  };
}

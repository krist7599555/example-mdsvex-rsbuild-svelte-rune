import * as mdsvex from "./packages/mdsvex-slim.mjs";
import * as toml from "toml";
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkDirectiveRehype from "remark-directive-rehype";
import { visit } from 'unist-util-visit'
import rehypeStringify from 'rehype-stringify'
import rehypeFormat from 'rehype-format'
import {h} from 'hastscript'
import rehypeSanitize from 'rehype-sanitize'
import "mdast-util-directive" // type only
// This plugin is an example to let users write HTML with directives.
// It’s informative but rather useless.
// See below for others examples.
function myRemarkPlugin(...args) {
  // console.log("create my re mark plugin", args)
 /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @param {import('vfile').VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
 return (tree, file) => {
  visit(tree, function (node) {
    if (node.type === "text" && node.value.includes(":::chat")) {
      console.log('TESTNODE', node)
    }
    if (
      node.type === 'containerDirective' ||
      node.type === 'leafDirective' ||
      node.type === 'textDirective'
    ) {
      console.log("NODE>>>", node.type)
      if (node.name !== 'chat') return

      const data = node.data || (node.data = {})
      const attributes = node.attributes || {}
      const id = attributes.id

      if (node.type === 'textDirective') {
        file.fail(
          'Unexpected `:chat` text directive, use 3 colons (:::chat[nice] ... :::) for a ContainerDirective (https://github.com/syntax-tree/mdast-util-directive#containerdirective-1)',
          node
        )
      }
      if (node.type === 'LeafDirective') {
        file.fail(
          'Unexpected `::chat` text directive, use 3 colons (:::chat[nice] ... :::) for a ContainerDirective (https://github.com/syntax-tree/mdast-util-directive#containerdirective-1)',
          node
        )
      }

      

      data.hName = 'chat'
      // data.hProperties = attributes; 
      data.hProperties = h('xxx', node.attributes || {}).properties
      // console.log('>>>DATA', data)
      // {

      //   src: 'https://www.youtube.com/embed/' + id,
      //   width: 200,
      //   height: 200,
      //   frameBorder: 0,
      //   allow: 'picture-in-picture',
      //   allowFullScreen: true
      // }

    }
  })
} 
}

/**
 * svete-rune-loader
 * @param {string} source svelte source code
 * @returns string
 */
export default async function MdsvexLoader(source) {
  const out = await mdsvex.compile(source)
  return out.code;
}

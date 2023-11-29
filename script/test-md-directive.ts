// import { unified } from 'unified'
// import remarkParse from 'remark-parse'
// import remarkDirective from 'remark-directive'
// import remark2Rehype from 'remark-rehype'
// import rehypeStringify from 'rehype-stringify'

// import { compile } from 'mdsvex'

import { compile } from '../packages/mdsvex-slim.mjs'

let md = `---
title = "ชื่อ Title"
---

<script lang="ts" context="module">
export const HI = "9988";
</script>

<script lang="ts">
import { match } from 'ts-pattern'; 
let count = $state(0)
const height = {
  name: '9900',
  k: 13,
  hh: [1,2,3]
} as const;
</script>

## ohh {title}

<button on:click={() => count += 1}>inc</button>

{#each [1,2,3] as i}
  <button>{i}</button>
{/each}

> jarama<br>
> rnaja<br />
> <blockquote>ohh</blockquote>

:::Nice
okeee

> okeee

- okeee
- okeee
- okeee
:::

`

console.log((await compile(md))?.code)

// const unifiedResult = await unified()
//   .use(remarkParse)
//   .use(remarkDirective)
//   .use(remark2Rehype)
//   .use(rehypeStringify)
//   .process(md)

// console.log(unifiedResult.value)

// let mdsvexResult = await compile(md, {
//   remarkPlugins: [
//     remarkParse,
//     remarkDirective,
//   ],
//   rehypePlugins: [
//     rehypeStringify
//   ],
//   smartypants: false,
// })

// console.log(mdsvexResult.code)
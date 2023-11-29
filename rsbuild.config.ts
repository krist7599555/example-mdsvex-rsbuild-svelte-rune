import { defineConfig } from "@rsbuild/core";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config";
import { LoaderOption as MdxLoaderOption } from "./packages/mdsvex-slim-loader.mjs";

const mdxOption: MdxLoaderOption = {
  // prettier-ignore
  custom_containers: [
    { type: "nice", hName: "Chat", hProperties: { people: "น้องไนซ์", color: "#ffe1a6" } },
    { type: "mom", hName: "Chat", hProperties: { people: "แม่นก", color: "#ffd3fa" } },
    { type: "member", hName: "Chat", hProperties: { people: "สมาชิก", color: "#e0e0ff" } },
    { type: "chat", hName: "Chat", hProperties: { color: "#d3f3cc" } },
  ].map(({ type, hName, hProperties }) => ({
    type: type,
    transform(node, config) {
      node.data ??= { hName, hProperties }
      node.data.hName = hName;
      node.data.hProperties = {
        people: config ?? "นิรนาม",
        ...hProperties,
      };
    },
  })),
  inject_script: (source) => {
    return `\nimport Chat from '../src/Chat.svelte\n';` + source;
  },
};

// https://rsbuild.dev/config/options/tools#toolspostcss
export default defineConfig({
  tools: {
    postcss: (opt) => {
      opt.postcssOptions?.plugins?.push(tailwindcss(tailwindConfig));
      opt.postcssOptions?.plugins?.push(autoprefixer);
    },
    // prettier-ignore
    rspack(config, { addRules }) {
      config.resolveLoader ??= {};
      config.resolveLoader.alias ??= {};
      config.resolveLoader.alias["svelte-loader"] = "./packages/svelte-loader.mjs";
      config.resolveLoader.alias["mdsvex-loader"] = "./packages/mdsvex-slim-loader.mjs";
      addRules({
        test: /.(svelte)$/,
        use: [{ loader: "svelte-loader" }],
      });
      addRules({
        test: /.(md|svx)$/,
        use: [
          { loader: "svelte-loader" },
          { loader: "mdsvex-loader", options: mdxOption },
        ],
      });
      return config;
    },
  },
  source: { entry: { index: "./src/index.ts" } },
  html: {
    meta: {
      charset: { charset: "UTF-8" },
      viewport: "width=device-width, initial-scale=1.0",
      description: "Fan Page คำสอนอาจารย์น้องไนซ์ ฉบับทำให้ตัวเองศึกษา",
    },
    title: "ธรรมะ อาจารย์น้องไนซ์ ฉบับ Digital",
    outputStructure: "flat",
    favicon: "./src/static/favicon.jpg",
    inject: "body",
    template: "./src/index.html",
  },
});

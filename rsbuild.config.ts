import { defineConfig } from "@rsbuild/core";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config";

// https://rsbuild.dev/config/options/tools#toolspostcss
export default defineConfig({
  tools: {
    postcss: (opt) => {
      opt.postcssOptions?.plugins?.push(tailwindcss(tailwindConfig));
      opt.postcssOptions?.plugins?.push(autoprefixer);
    },
    rspack(config, { addRules }) {
      config.resolveLoader ??= {};
      config.resolveLoader.alias ??= {};
      config.resolveLoader.alias["svelte-loader"] =
        "./rsbuild-svelte-loader.mjs";
      config.resolveLoader.alias["mdsvex-loader"] =
        "./rsbuild-mdsvex-loader.mjs";
      addRules({ test: /.(md|svx)$/, use: ["svelte-loader", "mdsvex-loader"] });
      addRules({ test: /.(svelte)$/, use: ["svelte-loader"] });
      return config;
    },
  },
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
  html: {
    meta: {
      charset: {
        charset: "UTF-8",
      },
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

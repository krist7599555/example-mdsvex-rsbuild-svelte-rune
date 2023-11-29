/// <reference types="@rsbuild/core/types" />
/// <reference types="svelte" />
/// <reference types="bun-types" />

declare module "*.md" {
  const component: import("svelte").ComponentType<
    import("svelte").SvelteComponent
  >;
  export default component;
  export const metadata: {
    title: string;
    slug: string;
    [key: string]: any;
  };
}


export function compile(source: string): PreprocessorReturn

export interface MdsvexSlimCompileOptions {
  filename?: string;
  frontmatter?: {
    marker: "-" | "+";
    type: "yaml" | "toml"
  },
  unified?: () => typeof import("unified").unified
}
export type PreprocessorReturn = Promise<{
  code: string;
  data?: Record<string, unknown>;
  map?: string;
} | undefined>;

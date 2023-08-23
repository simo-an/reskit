import { execSync } from "child_process";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import process from "process";
import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };

const command = 'git describe --always --tags --long --match "v*" --dirty';
const GIT_VERSION = execSync(command).toString().trim();
const BUILD_INFO = `${GIT_VERSION}(${new Date().toLocaleString()})`;

const isDev = process.env.BUILD === "development";

const config = defineConfig({
  input: "index.ts",
  output: [
    {
      file: pkg.main,
      name: "KitColor",
      format: "umd",
      sourcemap: false,
      banner: `/** reskit-color-${BUILD_INFO} **/`,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: false,
      banner: `/** reskit-color-${BUILD_INFO} **/`,
    },
  ],
  external: [
    ...Object.keys({
      ...pkg.dependencies,
    }),
  ],
  plugins: [
    replace({
      preventAssignment: true,
      __VERSION__: pkg.version,
      __BUILD_INFO__: BUILD_INFO,
      __DEV__: String(isDev),
    }),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    !isDev && terser(),
  ],
});

export default config;

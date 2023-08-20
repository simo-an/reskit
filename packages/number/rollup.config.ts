import { execSync } from "child_process";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
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
      name: "KitNumber",
      format: "umd",
      sourcemap: false,
      banner: `/** reskit-number-${BUILD_INFO} **/`,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: false,
      banner: `/** reskit-number-${BUILD_INFO} **/`,
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
      // https://github.com/rollup/plugins/tree/master/packages/replace
      __VERSION__: pkg.version,
      __BUILD_INFO__: BUILD_INFO,
      __DEV__: String(isDev),
    }),
    resolve({
      // https://github.com/rollup/plugins/tree/master/packages/node-resolve
      extensions: [".js", ".ts"],
      mainFields: ["browser", "jsnext:main", "module", "main"],
      preferBuiltins: true,
    }),
    json(), // https://github.com/rollup/plugins/tree/master/packages/json
    commonjs(), // https://github.com/rollup/plugins/tree/master/packages/commonjs
    typescript({
      tsconfig: "tsconfig.json",
    }), //
    //https://github.com/TrySound/rollup-plugin-terser
    !isDev && terser(),
  ],
});

export default config;

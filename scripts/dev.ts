import esbuild, { type PluginBuild } from "esbuild";
import { resolve, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const appVersion = execSync('git describe --always --tags --long --match "v*" --dirty')
  .toString()
  .trim();

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const target = process.argv[2];

console.info(`current target is: ${target}`);

if (!target) {
  throw new Error("please provide target!");
}

const pkg = require(`../packages/${target}/package.json`);

const outFile: string = resolve(__dirname, `../packages/${target}/dist/reskit-${target}.esm.mjs`);
const inFile: string = resolve(__dirname, `../packages/${target}/index.ts`);

const relativeOutFile = relative(process.cwd(), outFile);

// resolve externals
const external: any[] = [];

const plugins = [
  {
    name: "log-rebuild",
    setup(build: PluginBuild) {
      build.onEnd(() => console.log(`built: ${relativeOutFile}`));
    },
  },
];

esbuild
  .context({
    entryPoints: [inFile],
    outfile: outFile,
    bundle: true,
    external,
    sourcemap: true,
    format: "esm",
    plugins,
    define: {
      __VERSION__: `"${pkg.version}"`,
      __DEV__: `true`,
      __BUILD_INFO__: `"${appVersion}(${new Date().toLocaleString()})"`,
    },
  })
  .then((ctx) => ctx.watch());

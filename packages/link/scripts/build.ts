import { execSync } from "child_process";
  import { writeFile, rmSync, copyFileSync } from "node:fs";
  import { resolve } from "node:path";
  import pkg from "../package.json" assert { type: "json" };
  
  const isDev = process.argv[2] === "--dev";
  
  async function buildProject() {
    rmSync(resolve(__dirname, "../dist"), { recursive: true, force: true });
    execSync(
      isDev
        ? "rollup --config rollup.config.ts --environment BUILD:development --configPlugin typescript"
        : "rollup --config rollup.config.ts --configPlugin typescript"
    );
  }
  
  function updateWorkspaceVersion(dependencies: Record<string, string>) {
    Object.entries(dependencies).forEach(([name, version]) => {
      if (version === "workspace:*") {
        dependencies[name] = `^${pkg.version}`;
      }
    });
  
    return dependencies;
  }
  
  async function createPublishFile() {
    copyFileSync(resolve(__dirname, "../README.md"), resolve(__dirname, "../dist/README.md"));
  
    const template = {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      main: pkg.main.replace("dist/", ""),
      module: pkg.module.replace("dist/", ""),
      types: pkg.types.replace("dist/", ""),
      declaration: true,
      author: pkg.author,
      keywords: pkg.keywords,
      license: pkg.license,
      repository: pkg.repository,
      bugs: pkg.bugs,
      homepage: pkg.homepage,
      dependencies: updateWorkspaceVersion(pkg.dependencies),
    };
  
    writeFile(
      resolve(__dirname, "../dist/package.json"),
      JSON.stringify(template, null, "	"),
      { encoding: "utf8" },
      (err) => console.log(err || `write package.json, current version ${pkg.version}`)
    );
  }
  
  async function bootstrap() {
    await buildProject();
    await createPublishFile();
  }
  
  void bootstrap();
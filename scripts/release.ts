import { execSync } from "child_process";
import inquirer from "inquirer";
import { toStandardVersion } from "./utils";

import { fileURLToPath } from "url";

import { dirname, resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projects = ["packages/room", "packages/location", "packages/shared"];
const packages = projects.map((project) => `${project}/package.json`);

packages.push("package.json");

function getCurrentVersion(): string {
  return JSON.parse(readFileSync(resolve(__dirname, "../package.json")).toString()).version;
}

function createNextVersion() {
  const current = getCurrentVersion().split(".");
  const next = Number(current.at(-1)) + 1;

  current[current.length - 1] = next.toString();

  return current.join(".");
}

async function updateAppVersion(version: string) {
  packages.forEach((file) => {
    const packagePath = resolve(__dirname, `../${file}`);
    const content: { version: string } = JSON.parse(readFileSync(packagePath).toString());

    content.version = version;

    writeFileSync(packagePath, JSON.stringify(content, null, 2));
  });

  packages.forEach((file) => execSync(`git add ${file}`));
}

async function pushToRepository(version: string) {
  const { push } = await inquirer.prompt<{ push: boolean }>([
    {
      type: "confirm",
      name: "push",
      message: "push code?",
    },
  ]);

  if (push) {
    execSync(`git commit -m "chore: update version to ${version}"`);
    execSync(`git tag v${version}`);
    execSync("git push origin");
  }
}

async function buildProject() {
  const { build } = await inquirer.prompt<{ build: boolean }>([
    {
      type: "confirm",
      name: "build",
      message: "build project?",
    },
  ]);

  if (build) {
    execSync("pnpm run build", { stdio: "inherit" });
  }
}

async function publishToNpm() {
  projects.forEach((project) =>
    execSync(`npm publish ${project}/dist --access public`, { stdio: "inherit" })
  );
}

async function bootstrap() {
  console.info("normal  version: 1.0.0");
  console.info("special version: 1.0.0-alpha.0 | 1.0.0-beta.1 | 1.0.0-rc.2");

  const targetVersion = "";

  const { version } = targetVersion
    ? { version: targetVersion }
    : await inquirer.prompt<{ version: string }>([
        {
          type: "input",
          name: "version",
          message: "input version:",
          default: createNextVersion(),
        },
      ]);

  const standardVersion = toStandardVersion(version.trim());

  await updateAppVersion(standardVersion);
  await pushToRepository(standardVersion);
  await buildProject();

  const { publish } = await inquirer.prompt<{ publish: boolean }>([
    {
      type: "confirm",
      name: "publish",
      message: "publish to npm?",
    },
  ]);

  if (publish) {
    await publishToNpm();
  }
}

void bootstrap();

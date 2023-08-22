function createTsConfig(subModule: string) {
  const template = `
{
  "extends": "./../../tsconfig.json",
  "include": [
    "env.d.ts",
    "src",
    "index.ts"
  ],
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true
  }
}
  `;

  return template.trim();
}

export { createTsConfig };

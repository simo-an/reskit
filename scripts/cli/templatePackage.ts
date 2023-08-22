function createPackage(subModule: string) {
  const template = `
{
  "name": "@reskit/${subModule}",
  "version": "1.2.2",
  "description": "A kit of ${subModule} extraction",
  "main": "dist/reskit-${subModule}.js",
  "module": "dist/reskit-${subModule}.esm.mjs",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "pnpm run build-bundle-dev -w",
    "build": "tsx scripts/build.ts",
    "build-dev": "tsx scripts/build.ts --dev",
    "test": "tsx __test__/index.ts",
    "format": "prettier --write --parser typescript src/**/*.ts index.ts",
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "(src|__test__)/**/*.ts": [
      "prettier --write"
    ]
  },
  "author": "simu",
  "keywords": [
    "reskit",
    "${subModule}",
    "extract",
    "extraction"
  ],
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/simo-an/reskit.git"
  },
  "homepage": "https://github.com/simo-an/reskit/tree/main/packages/${subModule}",
  "bugs": {
    "url": "https://github.com/simo-an/reskit/issues"
  },
  "dependencies": {},
  "devDependencies": {}
}
  `;

  return template.trim();
}

export { createPackage };

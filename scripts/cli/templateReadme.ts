function createReadme(subModule: string) {
  const template = `
## Install

Install \`@reskit/${subModule}\` by \`pnpm\`

\`\`\`bash
pnpm add @reskit/${subModule}
\`\`\`

## Others

Welcome to create PR and make @reskit/${subModule} better!
`;

  return template.trim();
}

export { createReadme };

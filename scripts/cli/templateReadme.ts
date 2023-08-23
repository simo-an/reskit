function createReadme(subModule: string) {
  const template = `
## Install

Install \`@reskit/${subModule}\` by \`pnpm\`

\`\`\`bash
pnpm add @reskit/${subModule}
\`\`\`

## Usage

\`\`\`ts
import {  } from "@reskit/${subModule}";

\`\`\`

## Functions

### Func1

\`\`\`ts
import {  } from "@reskit/${subModule}";

\`\`\`

## Others

Welcome to contribute and make @reskit/${subModule} better!
`;

  return template.trim();
}

export { createReadme };

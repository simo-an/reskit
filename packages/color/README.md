## Install

Install `@reskit/color` by `pnpm`

```bash
pnpm add @reskit/color
```

## Usage

```ts
import { extractImageColor, extractImageColorInRust } from "@reskit/color";

const imageLink = "https://avatars.githubusercontent.com/u/38021707?v=4";

extractImageColorInRust(imageLink, 5);
extractImageColor(imageLink, 5);
```

We will extract the top five color at this image.

Sample codes are at [ExtractImageColor](https://github.com/simo-an/reskit/blob/main/projects/reskit-quick-svelte/src/ExtractImageColor.svelte)

> We support extract color at rust code which has higher performance.

## Functions

Extract color at text.

### Extract Hex

```ts
import { extractColor } from "@reskit/color";

extractColor("Color is #5c2b2b");
```

will extract: `["#5c2b2b"]`

### Extract RGB AND HSL

```ts
import { extractColor } from "@reskit/color";

extractColor("Color is rgb(62, 33, 33) and hsl(0, 1%, 66%)");
```

will extract: `["rgb(62, 33, 33)", "hsl(0, 1%, 66%)"]`

### Extract RGBA AND HSLA

```ts
import { extractColor } from "@reskit/color";

extractColor("Color is rgba(62, 33, 33, 0.3) and hsla(0, 30.50%, 18.60%, 0.30)");
```

will extract: `["rgba(62, 33, 33, 0.3)", "hsla(0, 30.50%, 18.60%, 0.30)"]`

## Others

Welcome to contribute and make @reskit/color better!

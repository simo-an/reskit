## Install

Install `@reskit/emoji` by `pnpm`

```bash
pnpm add @reskit/emoji
```

## Usage

### Extract common emoji

Faster and smaller

```ts
import { extractCommonEmoji } from "@reskit/emoji";

extractCommonEmoji("this is the emoji 😁😃😆");
```

Output

```bash
["😁", "😃", "😆"]
```

### Extract full-supported emoji

```ts
import { extractEmoji } from "@reskit/emoji";

extractEmoji("👍🏻👍🏼👍🏽👍🏾👍🏿", true);
```

Output

```bash
["👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿"]
```

## Others

Welcome to contribute and make @reskit/emoji better!

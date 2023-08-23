## Install

Install `@reskit/link` by `pnpm`

```bash
pnpm add @reskit/link
```

## Functions

### Extract Link

Input

```ts
import { extractLink } from "@reskit/link";

extractLink("the link is: ftp://192.168.0.111/");
```

Output

```bash
["ftp://192.168.0.111/"]
```

### Extract Multiple Links

```ts
extractLink("the link is: http://www.google.com:80/s?wd=vue#page and mailto://www.baidu.com/s !");
```

Output

```ts
["http://www.google.com:80/s?wd=vue#page", "mailto://www.baidu.com/s"];
```

### Extract Link From Tag <a>

```ts
extractLink("the link is: <a target='_blank' href='http://www.baidu.com/'>Baidu</a>");
```

Output

```bash
["http://www.baidu.com/"]
```

### Extract Path-Like Link

```ts
extractLink("the path is: ./usr/local/bin", { includePath: true });
```

Output

```bash
["./usr/local/bin"]
```

## Others

Welcome to create PR and make @reskit/link better!

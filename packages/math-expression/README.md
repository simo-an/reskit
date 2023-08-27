## Install

Install `@reskit/math-expression` by `pnpm`

```bash
pnpm add @reskit/math-expression
```

## Functions

You should import method:

```typescript
import { extractMathExpression, computeMathExpression } from "@reskit/math-expression";
```

### Extract Math Expression

Input

```typescript
extractMathExpression("Calculate 1+3+4-5");
```

Output

```bash
["1+3+4-5"]
```

You can compute it by `@reskit/shared`

Input

```typescript
import { calculate } from "@reskit/shared";

calculate("1+3+4-5");
```

Output

```bash
3
```

### Compute Math Expression

```typescript
computeMathExpression("Answer: 1+ 3+(4-5)*6/ 3");
```

Output

```bash
Answer: 2
```

### Compute Decimal

Input

```typescript
computeMathExpression("Answer: 65+28.6+35+71.4");
```

Output

```bash
Answer: 200
```

### Multiple Math Expression

Input

```ts
computeMathExpression("Answer: A = 65+28.6+(1 + 35/7)+71.4; B = 1.1+1.2+1.3+1.4");
```

Output

```bash
Answer: A = 200; B = 5
```

## Others

Welcome to create PR and make @reskit/math-expression better!

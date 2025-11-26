# SearchEffort

This parameter maps to different configurations regarding the depth of research the tool can perform. Its values range from `low`, `medium` to `high`.  

Alternatively, use `auto` mode for a more dynamic search approach, allowing the tool the freedom to adjust its subparameters.

## Example Usage

```typescript
import { SearchEffort } from "youdotcom/models";

let value: SearchEffort = "auto";
```

## Values

```typescript
"auto" | "low" | "medium" | "high"
```
# SafeSearch

Configures the safesearch filter for content moderation. This allows you to decide whether to return NSFW content or not.

## Example Usage

```typescript
import { SafeSearch } from "@youdotcom-oss/sdk/models";

let value: SafeSearch = "off";
```

## Values

```typescript
"off" | "moderate" | "strict"
```
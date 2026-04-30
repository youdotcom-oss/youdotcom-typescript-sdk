# Type

The type of output. This can either be:
* `message.answer` for text responses
* `web_search.results` for output that contains web links. `web_search.results` only appear when you use the `research` tool or express agent with web_search

## Example Usage

```typescript
import { Type } from "@youdotcom-oss/sdk/models";

let value: Type = "web_search.results";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"message.answer" | "web_search.results" | Unrecognized<string>
```
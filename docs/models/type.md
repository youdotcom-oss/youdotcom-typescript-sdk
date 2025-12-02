# Type

The type of output. This can either be:
* `message.answer` for text responses
* `web_search.results` for output that contains web links. `web_search.results` only appear when you use the `research` tool or express agent with web_search

## Example Usage

```typescript
import { Type } from "youdotcom/models";

let value: Type = "web_search.results";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"message.answer" | "web_search.results" | Unrecognized<string>
```
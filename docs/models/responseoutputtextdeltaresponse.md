# ResponseOutputTextDeltaResponse

## Example Usage

```typescript
import { ResponseOutputTextDeltaResponse } from "youdotcom/models";

let value: ResponseOutputTextDeltaResponse = {
  outputIndex: 1,
  type: "message.answer",
  delta: " Test",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `outputIndex`                                              | *number*                                                   | :heavy_check_mark:                                         | N/A                                                        | 1                                                          |
| `type`                                                     | [models.TypeMessageAnswer](../models/typemessageanswer.md) | :heavy_check_mark:                                         | N/A                                                        | message.answer                                             |
| `delta`                                                    | *string*                                                   | :heavy_check_mark:                                         | Incremental text content                                   |  Test                                                      |
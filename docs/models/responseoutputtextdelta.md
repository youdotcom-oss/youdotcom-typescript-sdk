# ResponseOutputTextDelta

## Example Usage

```typescript
import { ResponseOutputTextDelta } from "youdotcom/models";

let value: ResponseOutputTextDelta = {
  seqId: 6,
  type: "response.output_text.delta",
  response: {
    outputIndex: 1,
    type: "message.answer",
    delta: " Test",
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `seqId`                                                                                | *number*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    | 6                                                                                      |
| `type`                                                                                 | *"response.output_text.delta"*                                                         | :heavy_check_mark:                                                                     | N/A                                                                                    | response.output_text.delta                                                             |
| `response`                                                                             | [models.ResponseOutputTextDeltaResponse](../models/responseoutputtextdeltaresponse.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |
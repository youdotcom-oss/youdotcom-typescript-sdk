# ResponseOutputItemAdded

SSE event signifying an output item has been added

## Example Usage

```typescript
import { ResponseOutputItemAdded } from "@youdotcom-oss/sdk/models";

let value: ResponseOutputItemAdded = {
  seqId: 2,
  type: "response.output_item.added",
  response: {
    outputIndex: 0,
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `seqId`                                                                                | *number*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    | 2                                                                                      |
| `type`                                                                                 | *"response.output_item.added"*                                                         | :heavy_check_mark:                                                                     | N/A                                                                                    | response.output_item.added                                                             |
| `response`                                                                             | [models.ResponseOutputItemAddedResponse](../models/responseoutputitemaddedresponse.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |
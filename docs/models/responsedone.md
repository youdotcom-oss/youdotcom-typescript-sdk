# ResponseDone

## Example Usage

```typescript
import { ResponseDone } from "@youdotcom-oss/sdk/models";

let value: ResponseDone = {
  seqId: 249,
  type: "response.done",
  response: {
    runTimeMs: "8.029",
    finished: true,
  },
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `seqId`                                                          | *number*                                                         | :heavy_check_mark:                                               | N/A                                                              | 249                                                              |
| `type`                                                           | *"response.done"*                                                | :heavy_check_mark:                                               | N/A                                                              | response.done                                                    |
| `response`                                                       | [models.ResponseDoneResponse](../models/responsedoneresponse.md) | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
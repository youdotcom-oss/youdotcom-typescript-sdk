# ResponseStarting

SSE event signifying the response is starting

## Example Usage

```typescript
import { ResponseStarting } from "youdotcom/models";

let value: ResponseStarting = {
  seqId: 1,
  type: "response.starting",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `seqId`                                                          | *number*                                                         | :heavy_check_mark:                                               | N/A                                                              | 1                                                                |
| `type`                                                           | [models.ResponseStartingType](../models/responsestartingtype.md) | :heavy_check_mark:                                               | N/A                                                              | response.starting                                                |
# AgentRunsStreamingResponse

A server-sent event containing stock market update content

## Example Usage

```typescript
import { AgentRunsStreamingResponse } from "youdotcom/models";

let value: AgentRunsStreamingResponse = {
  id: "<id>",
  event: "<value>",
  data: {
    seqId: 1,
    type: "response.starting",
  },
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `id`                                            | *string*                                        | :heavy_check_mark:                              | Sequence number of the SSE event, starts from 0 |
| `event`                                         | *string*                                        | :heavy_check_mark:                              | The type of the SSE event                       |
| `data`                                          | *models.Data*                                   | :heavy_check_mark:                              | N/A                                             |
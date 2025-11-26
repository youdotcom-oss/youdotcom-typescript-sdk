# ResponseCreated

SSE event signifying the response stream has been created

## Example Usage

```typescript
import { ResponseCreated } from "youdotcom/models";

let value: ResponseCreated = {
  seqId: 0,
  type: "response.created",
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `seqId`                                                        | *number*                                                       | :heavy_check_mark:                                             | N/A                                                            | 0                                                              |
| `type`                                                         | [models.ResponseCreatedType](../models/responsecreatedtype.md) | :heavy_check_mark:                                             | N/A                                                            | response.created                                               |
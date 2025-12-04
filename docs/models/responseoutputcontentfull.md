# ResponseOutputContentFull

## Example Usage

```typescript
import { ResponseOutputContentFull } from "@youdotcom-oss/sdk/models";

let value: ResponseOutputContentFull = {
  seqId: 3,
  type: "response.output_content.full",
  response: {
    outputIndex: 0,
    type: "web_search.results",
    full: [],
  },
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `seqId`                                                                                    | *number*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        | 3                                                                                          |
| `type`                                                                                     | *"response.output_content.full"*                                                           | :heavy_check_mark:                                                                         | N/A                                                                                        | response.output_content.full                                                               |
| `response`                                                                                 | [models.ResponseOutputContentFullResponse](../models/responseoutputcontentfullresponse.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
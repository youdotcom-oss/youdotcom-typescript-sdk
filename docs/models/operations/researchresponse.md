# ResearchResponse

A JSON object containing a comprehensive answer with citations and supporting search results

## Example Usage

```typescript
import { ResearchResponse } from "@youdotcom-oss/sdk/models/operations";

let value: ResearchResponse = {
  output: {
    content: "<value>",
    contentType: "text",
    sources: [
      {
        url: "https://nimble-habit.net/",
      },
    ],
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `output`                                               | [operations.Output](../../models/operations/output.md) | :heavy_check_mark:                                     | The research output containing the answer and sources. |
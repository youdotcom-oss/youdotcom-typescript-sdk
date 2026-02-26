# Output

The research output containing the answer and sources.

## Example Usage

```typescript
import { Output } from "@youdotcom-oss/sdk/models/operations";

let value: Output = {
  content: "<value>",
  contentType: "text",
  sources: [
    {
      url: "https://nimble-habit.net/",
    },
  ],
};
```

## Fields

| Field                                                                                                                                                                 | Type                                                                                                                                                                  | Required                                                                                                                                                              | Description                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`                                                                                                                                                             | *string*                                                                                                                                                              | :heavy_check_mark:                                                                                                                                                    | The comprehensive response with inline citations. The content is formatted in Markdown and includes numbered citations that reference the items in the sources array. |
| `contentType`                                                                                                                                                         | [operations.ContentType](../../models/operations/contenttype.md)                                                                                                      | :heavy_check_mark:                                                                                                                                                    | The format of the content field.                                                                                                                                      |
| `sources`                                                                                                                                                             | [operations.Source](../../models/operations/source.md)[]                                                                                                              | :heavy_check_mark:                                                                                                                                                    | A list of web sources used to generate the answer.                                                                                                                    |
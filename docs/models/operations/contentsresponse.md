# ContentsResponse

## Example Usage

```typescript
import { ContentsResponse } from "@youdotcom-oss/sdk/models/operations";

let value: ContentsResponse = {
  url: "https://www.you.com",
  title: "The best website in the world",
  metadata: {
    siteName: "You.com",
    faviconUrl: "https://www.you.com/favicon.ico",
  },
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `url`                                                                      | *string*                                                                   | :heavy_minus_sign:                                                         | The webpage URL whose content has been fetched.                            | https://www.you.com                                                        |
| `title`                                                                    | *string*                                                                   | :heavy_minus_sign:                                                         | The title of the web page.                                                 | The best website in the world                                              |
| `html`                                                                     | *string*                                                                   | :heavy_minus_sign:                                                         | The retrieved HTML content of the web page.                                |                                                                            |
| `markdown`                                                                 | *string*                                                                   | :heavy_minus_sign:                                                         | The retrieved Markdown content of the web page.                            |                                                                            |
| `metadata`                                                                 | [operations.ContentsMetadata](../../models/operations/contentsmetadata.md) | :heavy_minus_sign:                                                         | N/A                                                                        |                                                                            |
# ContentsRequest

## Example Usage

```typescript
import { ContentsRequest } from "@youdotcom-oss/sdk/models/operations";

let value: ContentsRequest = {
  urls: [
    "https://www.you.com",
  ],
  formats: [
    "html",
    "markdown",
  ],
  crawlTimeout: 10,
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `urls`                                                                                        | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | Array of URLs to fetch the contents from.                                                     |                                                                                               |
| `formats`                                                                                     | [models.ContentsFormats](../../models/contentsformats.md)[]                                   | :heavy_minus_sign:                                                                            | The formats of the content to be returned. Can include 'html', 'markdown', and/or 'metadata'. | [<br/>"html",<br/>"markdown"<br/>]                                                            |
| `crawlTimeout`                                                                                | *number*                                                                                      | :heavy_minus_sign:                                                                            | The timeout in seconds for crawling each URL. Must be between 1 and 60 seconds.               | 10                                                                                            |
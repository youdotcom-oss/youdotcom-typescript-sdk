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
};
```

## Fields

| Field                                                                                                                                                             | Type                                                                                                                                                              | Required                                                                                                                                                          | Description                                                                                                                                                       | Example                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urls`                                                                                                                                                            | *string*[]                                                                                                                                                        | :heavy_minus_sign:                                                                                                                                                | Array of URLs to fetch the contents from.                                                                                                                         |                                                                                                                                                                   |
| `formats`                                                                                                                                                         | [models.ContentsFormats](../../models/contentsformats.md)[]                                                                                                       | :heavy_minus_sign:                                                                                                                                                | Array of content formats to return. All included formats are returned in the response. Include "metadata" to get JSON-LD and OpenGraph information, if available. | [<br/>"html",<br/>"markdown"<br/>]                                                                                                                                |
| `crawlTimeout`                                                                                                                                                    | *number*                                                                                                                                                          | :heavy_minus_sign:                                                                                                                                                | Maximum time in seconds to wait for page content. Must be between 1 and 60 seconds. Default is 10 seconds.                                                        | 10                                                                                                                                                                |
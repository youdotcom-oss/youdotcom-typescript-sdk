# ContentsRequest

## Example Usage

```typescript
import { ContentsRequest } from "@youdotcom-oss/sdk/models/operations";

let value: ContentsRequest = {
  urls: [
    "https://www.you.com",
  ],
  format: "html",
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               | Example                                   |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `urls`                                    | *string*[]                                | :heavy_minus_sign:                        | Array of URLs to fetch the contents from. |                                           |
| `format`                                  | *operations.Format*                       | :heavy_minus_sign:                        | The format of the content to be returned. | html                                      |
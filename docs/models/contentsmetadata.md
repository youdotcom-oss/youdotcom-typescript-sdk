# ContentsMetadata

Metadata about the web page. Only returned when 'metadata' is included in the formats array.

## Example Usage

```typescript
import { ContentsMetadata } from "@youdotcom-oss/sdk/models";

let value: ContentsMetadata = {
  siteName: "You.com",
  faviconUrl: "https://api.ydc-index.io/favicon?domain=you.com&size=128",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              | Example                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `siteName`                                               | *string*                                                 | :heavy_minus_sign:                                       | The OpenGraph site name of the web page.                 | You.com                                                  |
| `faviconUrl`                                             | *string*                                                 | :heavy_minus_sign:                                       | The URL of the favicon of the web page's domain.         | https://api.ydc-index.io/favicon?domain=you.com&size=128 |
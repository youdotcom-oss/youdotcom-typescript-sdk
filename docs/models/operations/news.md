# News

## Example Usage

```typescript
import { News } from "@youdotcom-oss/sdk/models/operations";

let value: News = {
  title: "Exclusive | You.com becomes the backbone of the EU's AI strategy",
  description:
    "As the EU's AI strategy is being debated, You.com becomes the backbone of the EU's AI strategy.",
  pageAge: new Date("2025-06-25T11:41:00"),
  thumbnailUrl: "https://www.somethumbnailsite.com/thumbnail.jpg",
  url: "https://www.you.com/news/eu-ai-strategy-youcom",
};
```

## Fields

| Field                                                                                           | Type                                                                                            | Required                                                                                        | Description                                                                                     | Example                                                                                         |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `title`                                                                                         | *string*                                                                                        | :heavy_minus_sign:                                                                              | The title of the news result.                                                                   | Exclusive \| You.com becomes the backbone of the EU's AI strategy                               |
| `description`                                                                                   | *string*                                                                                        | :heavy_minus_sign:                                                                              | A brief description of the content of the news result.                                          | As the EU's AI strategy is being debated, You.com becomes the backbone of the EU's AI strategy. |
| `pageAge`                                                                                       | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)   | :heavy_minus_sign:                                                                              | UTC timestamp of the article's publication date.                                                | 2025-06-25T11:41:00                                                                             |
| `thumbnailUrl`                                                                                  | *string*                                                                                        | :heavy_minus_sign:                                                                              | URL of the thumbnail.                                                                           | https://www.somethumbnailsite.com/thumbnail.jpg                                                 |
| `url`                                                                                           | *string*                                                                                        | :heavy_minus_sign:                                                                              | The URL of the news result.                                                                     | https://www.you.com/news/eu-ai-strategy-youcom                                                  |
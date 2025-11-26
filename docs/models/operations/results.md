# Results

## Example Usage

```typescript
import { Results } from "youdotcom/models/operations";

let value: Results = {
  web: [
    {
      url: "https://you.com",
      title: "The World's Greatest Search Engine!",
      description: "Search on YDC",
      snippets: [
        "I'm an AI assistant that helps you get more done. What can I help you with?",
      ],
      thumbnailUrl: "https://www.somethumbnailsite.com/thumbnail.jpg",
      pageAge: new Date("2025-06-25T11:41:00"),
      authors: [
        "John Doe",
      ],
      faviconUrl: "https://someurl.com/favicon",
    },
  ],
  news: [
    {
      title: "Exclusive | You.com becomes the backbone of the EU's AI strategy",
      description:
        "As the EU's AI strategy is being debated, You.com becomes the backbone of the EU's AI strategy.",
      pageAge: new Date("2025-06-25T11:41:00"),
      thumbnailUrl: "https://www.somethumbnailsite.com/thumbnail.jpg",
      url: "https://www.you.com/news/eu-ai-strategy-youcom",
    },
  ],
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `web`                                                | [operations.Web](../../models/operations/web.md)[]   | :heavy_minus_sign:                                   | N/A                                                  |
| `news`                                               | [operations.News](../../models/operations/news.md)[] | :heavy_minus_sign:                                   | N/A                                                  |
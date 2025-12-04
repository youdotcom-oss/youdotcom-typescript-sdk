# SearchResponse

A JSON object containing unified search results from web and news sources

## Example Usage

```typescript
import { SearchResponse } from "@youdotcom-oss/sdk/models/operations";

let value: SearchResponse = {
  results: {
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
        title:
          "Exclusive | You.com becomes the backbone of the EU's AI strategy",
        description:
          "As the EU's AI strategy is being debated, You.com becomes the backbone of the EU's AI strategy.",
        pageAge: new Date("2025-06-25T11:41:00"),
        thumbnailUrl: "https://www.somethumbnailsite.com/thumbnail.jpg",
        url: "https://www.you.com/news/eu-ai-strategy-youcom",
      },
    ],
  },
  metadata: {
    requestUuid: "942ccbdd-7705-4d9c-9d37-4ef386658e90",
    query: "Your query",
    latency: 0.123,
  },
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `results`                                                  | [operations.Results](../../models/operations/results.md)   | :heavy_minus_sign:                                         | N/A                                                        |
| `metadata`                                                 | [operations.Metadata](../../models/operations/metadata.md) | :heavy_minus_sign:                                         | N/A                                                        |
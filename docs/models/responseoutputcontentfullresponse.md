# ResponseOutputContentFullResponse

## Example Usage

```typescript
import { ResponseOutputContentFullResponse } from "youdotcom/models";

let value: ResponseOutputContentFullResponse = {
  outputIndex: 0,
  type: "web_search.results",
  full: [
    {
      sourceType: "web_search",
      citationUri:
        "https://www.foodnetwork.com/recipes/photos/30-minute-dinner-recipes",
      provider: "<value>",
      title: "103 Easy 30-Minute Dinner Recipes That Will Save Your Weeknights",
      snippet:
        "Apr 11, 2025 ... These quick dinner ideas will help you get a meal on the table in half an hour or less. ... It's a simple recipe ready in under half an hour with ...",
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJTNucjGK8ZqfurwAmyuyhQ-7n7AVZHoJwUqfsqRYuCqlIpMwepNDEE_M&s",
      url:
        "https://www.foodnetwork.com/recipes/photos/30-minute-dinner-recipes",
    },
  ],
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `outputIndex`                                                                              | *number*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        | 0                                                                                          |
| `type`                                                                                     | [models.TypeWebSearchResults](../models/typewebsearchresults.md)                           | :heavy_check_mark:                                                                         | N/A                                                                                        | web_search.results                                                                         |
| `full`                                                                                     | [models.AgentRunsResponseWebSearchResult](../models/agentrunsresponsewebsearchresult.md)[] | :heavy_check_mark:                                                                         | Complete web search results                                                                |                                                                                            |
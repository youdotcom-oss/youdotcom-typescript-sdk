# Web

## Example Usage

```typescript
import { Web } from "youdotcom/models/operations";

let value: Web = {
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
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `url`                                                                                         | *string*                                                                                      | :heavy_minus_sign:                                                                            | The URL of the specific search result.                                                        | https://you.com                                                                               |
| `title`                                                                                       | *string*                                                                                      | :heavy_minus_sign:                                                                            | The title or name of the search result.                                                       | The World's Greatest Search Engine!                                                           |
| `description`                                                                                 | *string*                                                                                      | :heavy_minus_sign:                                                                            | A brief description of the content of the search result.                                      | Search on YDC                                                                                 |
| `snippets`                                                                                    | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | An array of text snippets from the search result, providing a preview of the content.         |                                                                                               |
| `thumbnailUrl`                                                                                | *string*                                                                                      | :heavy_minus_sign:                                                                            | URL of the thumbnail.                                                                         | https://www.somethumbnailsite.com/thumbnail.jpg                                               |
| `pageAge`                                                                                     | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | The age of the search result.                                                                 | 2025-06-25T11:41:00                                                                           |
| `authors`                                                                                     | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | An array of authors of the search result.                                                     |                                                                                               |
| `faviconUrl`                                                                                  | *string*                                                                                      | :heavy_minus_sign:                                                                            | The URL of the favicon of the search result's domain.                                         | https://someurl.com/favicon                                                                   |
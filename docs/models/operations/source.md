# Source

## Example Usage

```typescript
import { Source } from "@youdotcom-oss/sdk/models/operations";

let value: Source = {
  url: "https://brisk-hawk.org/",
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `url`                                                                           | *string*                                                                        | :heavy_check_mark:                                                              | The URL of the source webpage.                                                  |
| `title`                                                                         | *string*                                                                        | :heavy_minus_sign:                                                              | The title of the source webpage.                                                |
| `snippets`                                                                      | *string*[]                                                                      | :heavy_minus_sign:                                                              | Relevant excerpts from the source page that were used in generating the answer. |
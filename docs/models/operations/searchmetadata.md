# SearchMetadata

## Example Usage

```typescript
import { SearchMetadata } from "@youdotcom-oss/sdk/models/operations";

let value: SearchMetadata = {
  searchUuid: "942ccbdd-7705-4d9c-9d37-4ef386658e90",
  query: "Your query",
  latency: 0.123,
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `searchUuid`                                           | *string*                                               | :heavy_minus_sign:                                     | N/A                                                    | 942ccbdd-7705-4d9c-9d37-4ef386658e90                   |
| `query`                                                | *string*                                               | :heavy_minus_sign:                                     | Returns the search query used to retrieve the results. | Your query                                             |
| `latency`                                              | *number*                                               | :heavy_minus_sign:                                     | N/A                                                    | 0.123                                                  |
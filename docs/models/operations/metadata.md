# Metadata

## Example Usage

```typescript
import { Metadata } from "youdotcom/models/operations";

let value: Metadata = {
  requestUuid: "942ccbdd-7705-4d9c-9d37-4ef386658e90",
  query: "Your query",
  latency: 0.123,
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `requestUuid`                                          | *string*                                               | :heavy_minus_sign:                                     | N/A                                                    | 942ccbdd-7705-4d9c-9d37-4ef386658e90                   |
| `query`                                                | *string*                                               | :heavy_minus_sign:                                     | Returns the search query used to retrieve the results. | Your query                                             |
| `latency`                                              | *number*                                               | :heavy_minus_sign:                                     | N/A                                                    | 0.123                                                  |
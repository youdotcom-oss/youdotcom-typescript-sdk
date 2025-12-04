# Detail

## Example Usage

```typescript
import { Detail } from "@youdotcom-oss/sdk/models";

let value: Detail = {
  type: "model_attributes_type",
  loc: [
    "body",
    "tools",
    0,
  ],
  msg: "Input should be a valid dictionary or object to extract fields from",
  input: "web_search",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `type`                                                              | *string*                                                            | :heavy_check_mark:                                                  | N/A                                                                 | model_attributes_type                                               |
| `loc`                                                               | *models.Loc*[]                                                      | :heavy_check_mark:                                                  | N/A                                                                 | [<br/>"body",<br/>"tools",<br/>0<br/>]                              |
| `msg`                                                               | *string*                                                            | :heavy_check_mark:                                                  | N/A                                                                 | Input should be a valid dictionary or object to extract fields from |
| `input`                                                             | *string*                                                            | :heavy_check_mark:                                                  | N/A                                                                 | web_search                                                          |
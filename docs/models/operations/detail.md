# Detail

## Example Usage

```typescript
import { Detail } from "@youdotcom-oss/sdk/models/operations";

let value: Detail = {
  type: "missing",
  loc: [
    "body",
    "input",
  ],
  msg: "Field required",
  input: "<value>",
};
```

## Fields

| Field                                                                                                 | Type                                                                                                  | Required                                                                                              | Description                                                                                           | Example                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `type`                                                                                                | *string*                                                                                              | :heavy_check_mark:                                                                                    | The validation error type.                                                                            | missing                                                                                               |
| `loc`                                                                                                 | *operations.Loc*[]                                                                                    | :heavy_check_mark:                                                                                    | The location of the error as a path of segments (strings for field names, integers for byte offsets). | [<br/>"body",<br/>"input"<br/>]                                                                       |
| `msg`                                                                                                 | *string*                                                                                              | :heavy_check_mark:                                                                                    | A human-readable description of the error.                                                            | Field required                                                                                        |
| `input`                                                                                               | *operations.InputUnion*                                                                               | :heavy_check_mark:                                                                                    | The input value that caused the error.                                                                |                                                                                                       |
| `ctx`                                                                                                 | Record<string, *any*>                                                                                 | :heavy_minus_sign:                                                                                    | Additional context about the error.                                                                   |                                                                                                       |
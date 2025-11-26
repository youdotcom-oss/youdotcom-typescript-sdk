# Input

## Example Usage

```typescript
import { Input } from "youdotcom/models";

let value: Input = {
  role: "user",
  content: "What is the capital of France?",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   | Example                                       |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `role`                                        | [models.Role](../models/role.md)              | :heavy_check_mark:                            | The access based role of the user             | user                                          |
| `content`                                     | *string*                                      | :heavy_check_mark:                            | The question populated in the request payload | What is the capital of France?                |
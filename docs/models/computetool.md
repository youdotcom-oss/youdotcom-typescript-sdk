# ComputeTool

## Example Usage

```typescript
import { ComputeTool } from "youdotcom/models";

let value: ComputeTool = {
  type: "compute",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`                                                                 | [models.ComputeToolType](../models/computetooltype.md)                 | :heavy_check_mark:                                                     | Setting this value to "compute" is mandatory to use the compute agent. |
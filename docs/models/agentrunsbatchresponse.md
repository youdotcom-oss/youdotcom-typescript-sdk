# AgentRunsBatchResponse

## Example Usage

```typescript
import { AgentRunsBatchResponse } from "@youdotcom-oss/sdk/models";

let value: AgentRunsBatchResponse = {
  agent: "express",
  mode: "express",
  input: [
    {
      role: "user",
      content: "What is the capital of France?",
    },
  ],
  output: [],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `agent`                                                                  | *string*                                                                 | :heavy_check_mark:                                                       | The id of the agent populated in the request.                            | express                                                                  |
| `mode`                                                                   | *string*                                                                 | :heavy_minus_sign:                                                       | The mode of the agent                                                    | express                                                                  |
| `input`                                                                  | [models.Input](../models/input.md)[]                                     | :heavy_check_mark:                                                       | The users access role and question you asked the agent                   |                                                                          |
| `output`                                                                 | [models.AgentRunsResponseOutput](../models/agentrunsresponseoutput.md)[] | :heavy_check_mark:                                                       | Array of response outputs from the agent                                 |                                                                          |
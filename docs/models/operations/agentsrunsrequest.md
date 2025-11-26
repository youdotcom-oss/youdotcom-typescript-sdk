# AgentsRunsRequest

The parameters to ask the agent a question


## Supported Types

### `models.ExpressAgentRunsRequest`

```typescript
const value: models.ExpressAgentRunsRequest = {
  agent: "express",
  input: "What are some great recipes I can make in under half an hour",
};
```

### `models.AdvancedAgentRunsRequest`

```typescript
const value: models.AdvancedAgentRunsRequest = {
  agent: "advanced",
  input: "Analyze the economic impact of renewable energy adoption",
  verbosity: "medium",
  workflowConfig: {},
};
```

### `models.CustomAgentRunsRequest`

```typescript
const value: models.CustomAgentRunsRequest = {
  agent: "63773261-b4de-4d8f-9dfd-cff206a5cb51",
  input: "What are some insights about my data?",
};
```


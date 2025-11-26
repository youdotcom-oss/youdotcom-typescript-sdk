# Data


## Supported Types

### `models.ResponseCreated`

```typescript
const value: models.ResponseCreated = {
  seqId: 0,
  type: "response.created",
};
```

### `models.ResponseStarting`

```typescript
const value: models.ResponseStarting = {
  seqId: 1,
  type: "response.starting",
};
```

### `models.ResponseOutputItemAdded`

```typescript
const value: models.ResponseOutputItemAdded = {
  seqId: 2,
  type: "response.output_item.added",
  response: {
    outputIndex: 0,
  },
};
```

### `models.ResponseOutputContentFull`

```typescript
const value: models.ResponseOutputContentFull = {
  seqId: 3,
  type: "response.output_content.full",
  response: {
    outputIndex: 0,
    type: "web_search.results",
    full: [],
  },
};
```

### `models.ResponseOutputItemDone`

```typescript
const value: models.ResponseOutputItemDone = {
  seqId: 4,
  type: "response.output_item.done",
  response: {
    outputIndex: 0,
  },
};
```

### `models.ResponseOutputTextDelta`

```typescript
const value: models.ResponseOutputTextDelta = {
  seqId: 6,
  type: "response.output_text.delta",
  response: {
    outputIndex: 1,
    type: "message.answer",
    delta: " Test",
  },
};
```

### `models.ResponseDone`

```typescript
const value: models.ResponseDone = {
  seqId: 249,
  type: "response.done",
  response: {
    runTimeMs: "8.029",
    finished: true,
  },
};
```


# You SDK

## Overview

You.com API: Unified API for Express, Advanced, and Custom Agents from You.com
Get the best search results from web and news sources
Returns the HTML or Markdown of a target webpage
Comprehensive API for You.com services:
- **Agents API**: Execute queries using Express, Advanced, and Custom AI agents
- **Search API**: Get search results from web and news sources
- **Contents API**: Retrieve and process web page content

### Available Operations

* [agentsRuns](#agentsruns) - Run an Agent
* [search](#search) - Returns a list of unified search results from web and news sources
* [contents](#contents) - Returns the content of the web pages

## agentsRuns

Execute queries using You.com's AI agents. This endpoint supports three agent types:

- **Express Agent**: Fast responses with optional web search (max 1 search)
- **Advanced Agent**: Complex queries with multi-turn reasoning, planning, and tool usage
- **Custom Agent**: User-configured assistants created in the You.com UI

The response format depends on the `stream` parameter - either a complete JSON payload or Server-Sent Events (SSE).


### Example Usage: advanced_batch

<!-- UsageSnippet language="typescript" operationID="AgentsRuns" method="post" path="/v1/agents/runs" example="advanced_batch" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.agentsRuns({
    agent: "advanced",
    input: "You are a biologist studying the impacts of microplastics. Explain what microplastics are to a group of engineers, explain the impacts of microplastics on the body, and what the common sources and dosages of microplastics are. Highlight what a safe dosage might be and how to achieve it",
    stream: false,
    tools: [
      {
        type: "research",
        searchEffort: "auto",
        reportVerbosity: "medium",
      },
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { agentsRuns } from "@youdotcom-oss/sdk/funcs/agentsRuns.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await agentsRuns(you, {
    agent: "advanced",
    input: "You are a biologist studying the impacts of microplastics. Explain what microplastics are to a group of engineers, explain the impacts of microplastics on the body, and what the common sources and dosages of microplastics are. Highlight what a safe dosage might be and how to achieve it",
    stream: false,
    tools: [
      {
        type: "research",
        searchEffort: "auto",
        reportVerbosity: "medium",
      },
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("agentsRuns failed:", res.error);
  }
}

run();
```
### Example Usage: advanced_stream

<!-- UsageSnippet language="typescript" operationID="AgentsRuns" method="post" path="/v1/agents/runs" example="advanced_stream" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.agentsRuns({
    agent: "express",
    input: "Analyze the economic impact of renewable energy adoption",
    stream: true,
    tools: [
      {
        type: "web_search",
      },
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { agentsRuns } from "@youdotcom-oss/sdk/funcs/agentsRuns.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await agentsRuns(you, {
    agent: "express",
    input: "Analyze the economic impact of renewable energy adoption",
    stream: true,
    tools: [
      {
        type: "web_search",
      },
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("agentsRuns failed:", res.error);
  }
}

run();
```
### Example Usage: custom_batch

<!-- UsageSnippet language="typescript" operationID="AgentsRuns" method="post" path="/v1/agents/runs" example="custom_batch" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.agentsRuns({
    agent: "63773261-b4de-4d8f-9dfd-cff206a5cb51",
    input: "What is the capital of France?",
    stream: false,
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { agentsRuns } from "@youdotcom-oss/sdk/funcs/agentsRuns.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await agentsRuns(you, {
    agent: "63773261-b4de-4d8f-9dfd-cff206a5cb51",
    input: "What is the capital of France?",
    stream: false,
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("agentsRuns failed:", res.error);
  }
}

run();
```
### Example Usage: custom_stream

<!-- UsageSnippet language="typescript" operationID="AgentsRuns" method="post" path="/v1/agents/runs" example="custom_stream" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.agentsRuns({
    agent: "63773261-b4de-4d8f-9dfd-cff206a5cb51",
    input: "Tell me about the history of Paris",
    stream: true,
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { agentsRuns } from "@youdotcom-oss/sdk/funcs/agentsRuns.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await agentsRuns(you, {
    agent: "63773261-b4de-4d8f-9dfd-cff206a5cb51",
    input: "Tell me about the history of Paris",
    stream: true,
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("agentsRuns failed:", res.error);
  }
}

run();
```
### Example Usage: express_batch

<!-- UsageSnippet language="typescript" operationID="AgentsRuns" method="post" path="/v1/agents/runs" example="express_batch" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.agentsRuns({
    agent: "express",
    input: "What is the capital of France?",
    stream: false,
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { agentsRuns } from "@youdotcom-oss/sdk/funcs/agentsRuns.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await agentsRuns(you, {
    agent: "express",
    input: "What is the capital of France?",
    stream: false,
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("agentsRuns failed:", res.error);
  }
}

run();
```
### Example Usage: express_stream

<!-- UsageSnippet language="typescript" operationID="AgentsRuns" method="post" path="/v1/agents/runs" example="express_stream" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.agentsRuns({
    agent: "express",
    input: "What are some great recipes I can make in under half an hour",
    stream: true,
    tools: [
      {
        type: "web_search",
      },
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { agentsRuns } from "@youdotcom-oss/sdk/funcs/agentsRuns.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await agentsRuns(you, {
    agent: "express",
    input: "What are some great recipes I can make in under half an hour",
    stream: true,
    tools: [
      {
        type: "web_search",
      },
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("agentsRuns failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.AgentsRunsRequest](../../models/operations/agentsrunsrequest.md)                                                                                                   | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |
| `options.serverURL`                                                                                                                                                            | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | An optional server URL to use.                                                                                                                                                 |

### Response

**Promise\<[operations.AgentsRunsResponse](../../models/operations/agentsrunsresponse.md)\>**

### Errors

| Error Type                       | Status Code                      | Content Type                     |
| -------------------------------- | -------------------------------- | -------------------------------- |
| errors.AgentRuns400ResponseError | 400                              | application/json                 |
| errors.AgentRuns401ResponseError | 401                              | application/json                 |
| errors.AgentRuns422ResponseError | 422                              | application/json                 |
| errors.YouDefaultError           | 4XX, 5XX                         | \*/\*                            |

## search

This endpoint is designed to return LLM-ready web results based on a user's query. Based on a classification mechanism, it can return web results and news associated with your query. If you need to feed an LLM with the results of a query that sounds like `What are the latest geopolitical updates from India`, then this endpoint is the right one for you.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="search" method="get" path="/v1/search" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.search({});

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { search } from "@youdotcom-oss/sdk/funcs/search.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await search(you, {});
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("search failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.SearchRequest](../../models/operations/searchrequest.md)                                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |
| `options.serverURL`                                                                                                                                                            | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | An optional server URL to use.                                                                                                                                                 |

### Response

**Promise\<[operations.SearchResponse](../../models/operations/searchresponse.md)\>**

### Errors

| Error Type                       | Status Code                      | Content Type                     |
| -------------------------------- | -------------------------------- | -------------------------------- |
| errors.SearchUnauthorizedError   | 401                              | application/json                 |
| errors.SearchForbiddenError      | 403                              | application/json                 |
| errors.SearchInternalServerError | 500                              | application/json                 |
| errors.YouDefaultError           | 4XX, 5XX                         | \*/\*                            |

## contents

Returns the HTML or Markdown of a target webpage.

### Example Usage: authFailure

<!-- UsageSnippet language="typescript" operationID="contents" method="post" path="/v1/contents" example="authFailure" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.contents({
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { contents } from "@youdotcom-oss/sdk/funcs/contents.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await contents(you, {
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contents failed:", res.error);
  }
}

run();
```
### Example Usage: authorizationFailure

<!-- UsageSnippet language="typescript" operationID="contents" method="post" path="/v1/contents" example="authorizationFailure" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.contents({
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { contents } from "@youdotcom-oss/sdk/funcs/contents.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await contents(you, {
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contents failed:", res.error);
  }
}

run();
```
### Example Usage: invalidOrExpired

<!-- UsageSnippet language="typescript" operationID="contents" method="post" path="/v1/contents" example="invalidOrExpired" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.contents({
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { contents } from "@youdotcom-oss/sdk/funcs/contents.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await contents(you, {
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contents failed:", res.error);
  }
}

run();
```
### Example Usage: missingApiKey

<!-- UsageSnippet language="typescript" operationID="contents" method="post" path="/v1/contents" example="missingApiKey" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.contents({
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { contents } from "@youdotcom-oss/sdk/funcs/contents.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await contents(you, {
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contents failed:", res.error);
  }
}

run();
```
### Example Usage: missingScopes

<!-- UsageSnippet language="typescript" operationID="contents" method="post" path="/v1/contents" example="missingScopes" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.contents({
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { contents } from "@youdotcom-oss/sdk/funcs/contents.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await contents(you, {
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contents failed:", res.error);
  }
}

run();
```
### Example Usage: otherAuthParsing

<!-- UsageSnippet language="typescript" operationID="contents" method="post" path="/v1/contents" example="otherAuthParsing" -->
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.contents({
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "@youdotcom-oss/sdk/core.js";
import { contents } from "@youdotcom-oss/sdk/funcs/contents.js";

// Use `YouCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const you = new YouCore({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const res = await contents(you, {
    urls: [
      "https://www.you.com",
    ],
    formats: [
      "html",
      "markdown",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contents failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ContentsRequest](../../models/operations/contentsrequest.md)                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ContentsResponse[]](../../models/.md)\>**

### Errors

| Error Type                         | Status Code                        | Content Type                       |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
| errors.ContentsUnauthorizedError   | 401                                | application/json                   |
| errors.ContentsForbiddenError      | 403                                | application/json                   |
| errors.ContentsInternalServerError | 500                                | application/json                   |
| errors.YouDefaultError             | 4XX, 5XX                           | \*/\*                              |
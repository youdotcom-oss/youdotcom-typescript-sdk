# You SDK

## Overview

You.com Contents API: Get the best search results from web and news sources

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


### Example Usage

<!-- UsageSnippet language="typescript" operationID="AgentsRuns" method="post" path="/v1/agents/runs" -->
```typescript
import { You } from "youdotcom";

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
import { YouCore } from "youdotcom/core.js";
import { agentsRuns } from "youdotcom/funcs/agentsRuns.js";

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

Returns a list of unified search results from web and news sources

### Example Usage

<!-- UsageSnippet language="typescript" operationID="search" method="get" path="/v1/search" -->
```typescript
import { You } from "youdotcom";

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
import { YouCore } from "youdotcom/core.js";
import { search } from "youdotcom/funcs/search.js";

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

Returns the content of the web pages

### Example Usage

<!-- UsageSnippet language="typescript" operationID="contents" method="post" path="/v1/contents" -->
```typescript
import { You } from "youdotcom";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  const result = await you.contents({
    urls: [
      "https://www.you.com",
    ],
    format: "html",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { YouCore } from "youdotcom/core.js";
import { contents } from "youdotcom/funcs/contents.js";

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
    format: "html",
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
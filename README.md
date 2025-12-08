# youdotcom

Developer-friendly & type-safe Typescript SDK specifically catered to leverage *youdotcom* API.

[![Built by Speakeasy](https://img.shields.io/badge/Built_by-SPEAKEASY-374151?style=for-the-badge&labelColor=f3f4f6)](https://www.speakeasy.com/?utm_source=youdotcom&utm_campaign=typescript)
[![License: MIT](https://img.shields.io/badge/LICENSE_//_MIT-3b5bdb?style=for-the-badge&labelColor=eff6ff)](https://opensource.org/licenses/MIT)


<br /><br />
> [!IMPORTANT]
> This SDK is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/youcom/documentation). Delete this section before > publishing to a package manager.

<!-- Start Summary [summary] -->
## Summary

You.com Contents API: Get the best search results from web and news sources
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [youdotcom](#youdotcom)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Server-sent event streaming](#server-sent-event-streaming)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add @youdotcom-oss/sdk
```

### PNPM

```bash
pnpm add @youdotcom-oss/sdk
```

### Bun

```bash
bun add @youdotcom-oss/sdk
```

### Yarn

```bash
yarn add @youdotcom-oss/sdk
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

We provide a comprehensive example file with interactive demos for all API endpoints. You can find it at [`examples/api-example-calls.ts`](examples/api-example-calls.ts).

To run the examples:

```bash
cd examples
npm install
npx tsx api-example-calls.ts
```

The example file includes:
- **Express Agent** - Batch and streaming requests
- **Advanced Agent** - Research-powered requests
- **Custom Agent** - Using your own agent configurations
- **Search API** - Web search queries
- **Contents API** - URL content extraction
<!-- No SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name         | Type   | Scheme  | Environment Variable |
| ------------ | ------ | ------- | -------------------- |
| `apiKeyAuth` | apiKey | API key | `YOU_API_KEY_AUTH`   |

To authenticate with the API the `apiKeyAuth` parameter must be set when initializing the SDK client instance. For example:
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
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [You SDK](docs/sdks/you/README.md)

* [agentsRuns](docs/sdks/you/README.md#agentsruns) - Run an Agent
* [search](docs/sdks/you/README.md#search) - Returns a list of unified search results from web and news sources
* [contents](docs/sdks/you/README.md#contents) - Returns the content of the web pages

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`agentsRuns`](docs/sdks/you/README.md#agentsruns) - Run an Agent
- [`contents`](docs/sdks/you/README.md#contents) - Returns the content of the web pages
- [`search`](docs/sdks/you/README.md#search) - Returns a list of unified search results from web and news sources

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start Server-sent event streaming [eventstream] -->
## Server-sent event streaming

[Server-sent events][mdn-sse] are used to stream content from certain
operations. These operations will expose the stream as an async iterable that
can be consumed using a [`for await...of`][mdn-for-await-of] loop. The loop will
terminate when the server no longer has any events to send and closes the
underlying connection.

```typescript
import { You } from "youdotcom";
import { 
  type ExpressAgentRunsRequest,
  type AgentRunsStreamingResponse,
} from "youdotcom/models"
import { type EventStream } from "youdotcom/lib/event-streams.js";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});
  
const request: ExpressAgentRunsRequest = {
  agent: "express",
  stream: true,
  input: "Restaurants in San Francisco",
  tools: [{  
    type: "web_search"  
  }]  
};
 
async function run() {
  const result = await you.agentsRuns(request) as EventStream<AgentRunsStreamingResponse>;

  // Iterate over the streaming response and print tokens as they arrive  
  for await (const chunk of result) {
    switch(chunk.data.type) { 
      case "response.created": { 
        console.log("Response created, seqId:", chunk.data.seqId); 
        break; 
      } 
      case "response.starting": { 
        console.log("Response starting, seqId:", chunk.data.seqId); 
        break; 
      } 
      case "response.output_item.added": { 
        console.log("Output item added:", chunk.data); 
        break; 
      } 
      case "response.output_content.full": { 
        console.log("\nWeb Search Results:");
        let urls = chunk.data.response.full.map((result) => {
          return result.url
        })
        console.log(urls);
        break; 
      } 
      case "response.output_text.delta": { 
        // This contains the incremental response from the agent
        process.stdout.write(chunk.data.response.delta)
        break; 
      } 
      case "response.output_item.done": { 
        console.log("\nOutput item done:", chunk.data); 
        break; 
      } 
      case "response.done": { 
        console.log("\nResponse completed!");
        console.log("Runtime:", chunk.data.response.runTimeMs, "ms");
        console.log("Finished:", chunk.data.response.finished); 
        break; 
      } 
      default: { 
        console.log("Unknown event type:", chunk.data); 
        break; 
      } 
    } 
  }  
}

run();
```

[mdn-sse]: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
[mdn-for-await-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
<!-- No Server-sent event streaming [eventstream] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
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
  }, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
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
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`YouError`](./src/models/errors/youerror.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { You } from "@youdotcom-oss/sdk";
import * as errors from "@youdotcom-oss/sdk/models/errors";

const you = new You({
  apiKeyAuth: process.env["YOU_API_KEY_AUTH"] ?? "",
});

async function run() {
  try {
    const result = await you.agentsRuns({
      agent: "express",
      input: "What is the capital of France?",
      stream: false,
    });

    console.log(result);
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.YouError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.AgentRuns400ResponseError) {
        console.log(error.data$.detail); // string
      }
    }
  }
}

run();

```

### Error Classes
**Primary error:**
* [`YouError`](./src/models/errors/youerror.ts): The base class for HTTP error responses.

<details><summary>Less common errors (15)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/httpclienterrors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/httpclienterrors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/httpclienterrors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/httpclienterrors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/httpclienterrors.ts): Unrecognised or unexpected error.


**Inherit from [`YouError`](./src/models/errors/youerror.ts)**:
* [`AgentRuns400ResponseError`](./src/models/errors/agentruns400responseerror.ts): The message returned by the error. Status code `400`. Applicable to 1 of 3 methods.*
* [`AgentRuns401ResponseError`](./src/models/errors/agentruns401responseerror.ts): The message returned by the error. Status code `401`. Applicable to 1 of 3 methods.*
* [`SearchUnauthorizedError`](./src/models/errors/searchunauthorizederror.ts): Unauthorized. Problems with API key. Status code `401`. Applicable to 1 of 3 methods.*
* [`ContentsUnauthorizedError`](./src/models/errors/contentsunauthorizederror.ts): Unauthorized. Status code `401`. Applicable to 1 of 3 methods.*
* [`SearchForbiddenError`](./src/models/errors/searchforbiddenerror.ts): Forbidden. API key lacks scope for this path. Status code `403`. Applicable to 1 of 3 methods.*
* [`ContentsForbiddenError`](./src/models/errors/contentsforbiddenerror.ts): Forbidden. Status code `403`. Applicable to 1 of 3 methods.*
* [`AgentRuns422ResponseError`](./src/models/errors/agentruns422responseerror.ts): Unprocessable Entity - Invalid request data. Status code `422`. Applicable to 1 of 3 methods.*
* [`SearchInternalServerError`](./src/models/errors/searchinternalservererror.ts): Internal Server Error during authentication/authorization middleware. Status code `500`. Applicable to 1 of 3 methods.*
* [`ContentsInternalServerError`](./src/models/errors/contentsinternalservererror.ts): Internal Server Error. Status code `500`. Applicable to 1 of 3 methods.*
* [`ResponseValidationError`](./src/models/errors/responsevalidationerror.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>

\* Check [the method documentation](#available-resources-and-operations) to see if the error is applicable.
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Override Server URL Per-Client

The default server can be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { You } from "@youdotcom-oss/sdk";

const you = new You({
  serverURL: "https://ydc-index.io",
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

### Override Server URL Per-Operation

The server URL can also be overridden on a per-operation basis, provided a server list was specified for the operation. For example:
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
  }, {
    serverURL: "https://api.you.com",
  });

  console.log(result);
}

run();

```
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { You } from "@youdotcom-oss/sdk";
import { HTTPClient } from "@youdotcom-oss/sdk/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new You({ httpClient: httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { You } from "@youdotcom-oss/sdk";

const sdk = new You({ debugLogger: console });
```

You can also enable a default debug logger by setting an environment variable `YOU_DEBUG` to true.
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, note that all files in this repository, with the exception of [`examples/api-example-calls.ts`](examples/api-example-calls.ts) and the [`openapi_schemas`](openapi_schemas) folder, are automatically generated by Speakeasy. Any manual changes outside of these files will be overwritten on the next generation.

We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release.

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=youdotcom&utm_campaign=typescript)

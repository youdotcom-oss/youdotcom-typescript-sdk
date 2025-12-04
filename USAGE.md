<!-- Start SDK Example Usage [usage] -->
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
<!-- End SDK Example Usage [usage] -->
// We've included code to run and parse our API offerings.
// To run this example from the examples directory: npx tsx api-example-calls.ts

import { You } from "@youdotcom-oss/sdk";
import {
  type ExpressAgentRunsRequest,
  type AdvancedAgentRunsRequest,
  type CustomAgentRunsRequest,
  type AgentRunsStreamingResponse,
  Language,
  Freshness, LiveCrawl, LiveCrawlFormats, ContentsFormats } from "@youdotcom-oss/sdk/models";

import { type EventStream } from "@youdotcom-oss/sdk/lib/event-streams.js";
import type { SearchRequest, ContentsRequest, ResearchRequest } from "@youdotcom-oss/sdk/models/operations";
import { ResearchEffort } from "@youdotcom-oss/sdk/models/operations";

// Will be initialized after user provides API key
let you: You;

async function expressBatchRequest() {
  const request: ExpressAgentRunsRequest = {
    agent: "express",
    stream: false,
    input: "What is the capital of France?",
    tools: [{
      type: "web_search"
    }]
  };
  const result = await you.agentsRuns(request);
  console.log(result);
}

async function expressStreamingRequest() {
  const request: ExpressAgentRunsRequest = {
    agent: "express",
    stream: true,
    input: "Restaurants in San Francisco",
    tools: [{
      type: "web_search"
    }]
  };
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
        // This contains incremental text content
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

async function advancedBatchRequest() {
  const request: AdvancedAgentRunsRequest = {
    agent: "advanced",
    stream: true,
    input: "What is the capital of France?",
    tools: [{
      type: "research",
      searchEffort: "low",
      reportVerbosity: "medium"
    }]
  };
  const result = await you.agentsRuns(request);
  console.log(result);
}

async function customBatchRequest() {
  const request: CustomAgentRunsRequest = {
    agent: "63773261-b4de-4d8f-9dfd-cff206a5cb51",
    stream: false,
    input: "What is the capital of France?"
  };
  const result = await you.agentsRuns(request);
  console.log(result);
}

async function searchRequest() {
  const request: SearchRequest = {
    query: "artificial intelligence in farming",
    count: 1,
    livecrawl: LiveCrawl.Web,
    livecrawlFormats: LiveCrawlFormats.Markdown,
  };
  const result = await you.search(request);
  console.log("Metadata:");
  console.log(result.metadata);
  console.log("Web Results:");
  let webResults = result.results?.web?.map((result) => {
    return result.url
  }) ?? [];
  console.log(webResults);
}

async function contentRequest() {
  const request: ContentsRequest = {
    urls: ["https://www.apple.com"],
    formats: [ContentsFormats.Markdown, ContentsFormats.Metadata],
  };
  const result = await you.contents(request);
  console.log(result);
}

async function researchRequest() {
  const question = "What are the top 5 electric vehicle companies by global sales in 2025?";
  const request: ResearchRequest = {
    input: question,
    researchEffort: ResearchEffort.Standard,
  };

  console.log("📝 Question:", question);
  console.log("⚙️  Effort level:", request.researchEffort);
  console.log("");

  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let frameIndex = 0;
  const startTime = Date.now();

  const spinner = setInterval(() => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    process.stdout.write(`\r${spinnerFrames[frameIndex]} Researching... (${elapsed}s)`);
    frameIndex = (frameIndex + 1) % spinnerFrames.length;
  }, 80);

  try {
    const result = await you.research(request);
    clearInterval(spinner);
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    process.stdout.write(`\r✅ Research complete! (${totalTime}s)\n\n`);

    console.log("📖 Research Answer:");
    console.log("─".repeat(50));
    console.log(result.output.content);
    console.log("─".repeat(50));
    console.log("\n🔗 Sources:");
    result.output.sources.forEach((source, index) => {
      console.log(`  [${index + 1}] ${source.title ?? source.url}`);
      console.log(`      ${source.url}`);
    });
  } catch (error) {
    clearInterval(spinner);
    process.stdout.write(`\r❌ Research failed!\n`);
    throw error;
  }
}

// Interactive CLI menu
import * as readline from "readline/promises";

const functions = [
  { name: "Research Request", fn: researchRequest },
  { name: "Express Batch Request", fn: expressBatchRequest },
  { name: "Express Streaming Request", fn: expressStreamingRequest },
  { name: "Advanced Batch Request", fn: advancedBatchRequest },
  { name: "Custom Batch Request", fn: customBatchRequest },
  { name: "Search Request", fn: searchRequest },
  { name: "Content Request", fn: contentRequest },
];

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║       You.com API Examples Menu        ║");
    console.log("╚════════════════════════════════════════╝\n");

    // Ask for API key first
    const apiKey = await rl.question("🔑 Enter your API key: ");
    if (!apiKey.trim()) {
      console.log("❌ API key is required.");
      return;
    }

    // Initialize the client with the provided API key
    you = new You({
      apiKeyAuth: apiKey.trim(),
    });

    console.log("\n✅ API key set!\n");

    // Show menu options
    functions.forEach((item, index) => {
      console.log(`  [${index + 1}] ${item.name}`);
    });
    console.log(`  [0] Exit\n`);

    const answer = await rl.question("Select an option: ");
    const choice = parseInt(answer, 10);

    if (choice === 0) {
      console.log("Goodbye!");
      return;
    }

    const selected = functions[choice - 1];
    if (choice >= 1 && choice <= functions.length && selected) {
      console.log(`\nRunning: ${selected.name}...\n`);
      await selected.fn();
    } else {
      console.log("Invalid selection. Please try again.");
    }
  } finally {
    rl.close();
  }
}

main();

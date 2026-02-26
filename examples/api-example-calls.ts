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

function createSpinner(label: string) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let frameIndex = 0;
  const startTime = Date.now();
  const interval = setInterval(() => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    process.stdout.write(`\r${frames[frameIndex]} ${label}... (${elapsed}s)`);
    frameIndex = (frameIndex + 1) % frames.length;
  }, 80);
  return {
    stop(success = true, doneLabel?: string) {
      clearInterval(interval);
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
      const icon = success ? "✅" : "❌";
      const msg = doneLabel ?? label;
      process.stdout.write(`\r\x1b[K${icon} ${msg} (${totalTime}s)\n\n`);
    },
  };
}

async function expressBatchRequest() {
  const input = "What is the capital of France?";
  const request: ExpressAgentRunsRequest = {
    agent: "express",
    stream: false,
    input,
    tools: [{ type: "web_search" }],
  };

  console.log("📝 Query:", input);
  console.log("");

  const spinner = createSpinner("Waiting for response");
  try {
    const result = await you.agentsRuns(request);
    spinner.stop(true, "Response received");
    console.log("📄 Result:");
    console.log("─".repeat(50));
    console.log(result);
    console.log("─".repeat(50));
  } catch (error) {
    spinner.stop(false, "Request failed");
    throw error;
  }
}

async function expressStreamingRequest() {
  const input = "Restaurants in San Francisco";
  const request: ExpressAgentRunsRequest = {
    agent: "express",
    stream: true,
    input,
    tools: [{ type: "web_search" }],
  };

  console.log("📝 Query:", input);
  console.log("");

  const spinner = createSpinner("Waiting for stream");
  const result = await you.agentsRuns(request) as EventStream<AgentRunsStreamingResponse>;
  spinner.stop(true, "Stream connected");

  console.log("📡 Streaming response:");
  console.log("─".repeat(50));

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
        console.log("\n🔗 Web Search Results:");
        const urls = chunk.data.response.full.map((r) => r.url);
        console.log(urls);
        break;
      }
      case "response.output_text.delta": {
        process.stdout.write(chunk.data.response.delta);
        break;
      }
      case "response.output_item.done": {
        console.log("\nOutput item done:", chunk.data);
        break;
      }
      case "response.done": {
        console.log("\n─".repeat(50));
        console.log("✅ Stream complete!");
        console.log("⏱  Runtime:", chunk.data.response.runTimeMs, "ms");
        console.log("🏁 Finished:", chunk.data.response.finished);
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
  const input = "What is the capital of France?";
  const request: AdvancedAgentRunsRequest = {
    agent: "advanced",
    stream: true,
    input,
    tools: [{
      type: "research",
      searchEffort: "low",
      reportVerbosity: "medium",
    }],
  };

  console.log("📝 Query:", input);
  console.log("🔧 Tools: research (low effort, medium verbosity)");
  console.log("");

  const spinner = createSpinner("Waiting for response");
  try {
    const result = await you.agentsRuns(request);
    spinner.stop(true, "Response received");
    console.log("📄 Result:");
    console.log("─".repeat(50));
    console.log(result);
    console.log("─".repeat(50));
  } catch (error) {
    spinner.stop(false, "Request failed");
    throw error;
  }
}

async function customBatchRequest() {
  const input = "What is the capital of France?";
  const agentId = "63773261-b4de-4d8f-9dfd-cff206a5cb51";
  const request: CustomAgentRunsRequest = {
    agent: agentId,
    stream: false,
    input,
  };

  console.log("📝 Query:", input);
  console.log("🤖 Agent ID:", agentId);
  console.log("");

  const spinner = createSpinner("Waiting for response");
  try {
    const result = await you.agentsRuns(request);
    spinner.stop(true, "Response received");
    console.log("📄 Result:");
    console.log("─".repeat(50));
    console.log(result);
    console.log("─".repeat(50));
  } catch (error) {
    spinner.stop(false, "Request failed");
    throw error;
  }
}

async function searchRequest() {
  const query = "artificial intelligence in farming";
  const request: SearchRequest = {
    query,
    count: 1,
    livecrawl: LiveCrawl.Web,
    livecrawlFormats: LiveCrawlFormats.Markdown,
  };

  console.log("📝 Query:", query);
  console.log("⚙️  Livecrawl:", request.livecrawl, "| Format:", request.livecrawlFormats);
  console.log("");

  const spinner = createSpinner("Searching");
  try {
    const result = await you.search(request);
    spinner.stop(true, "Search complete");
    console.log("🔍 Metadata:");
    console.log(result.metadata);
    console.log("\n🌐 Web Results:");
    console.log("─".repeat(50));
    const webResults = result.results?.web?.map((r) => r.url) ?? [];
    console.log(webResults);
    console.log("─".repeat(50));
  } catch (error) {
    spinner.stop(false, "Search failed");
    throw error;
  }
}

async function contentRequest() {
  const urls = ["https://www.apple.com"];
  const request: ContentsRequest = {
    urls,
    formats: [ContentsFormats.Markdown, ContentsFormats.Metadata],
  };

  console.log("📝 URLs:", urls.join(", "));
  console.log("⚙️  Formats: markdown, metadata");
  console.log("");

  const spinner = createSpinner("Fetching content");
  try {
    const result = await you.contents(request);
    spinner.stop(true, "Content fetched");
    console.log("📄 Result:");
    console.log("─".repeat(50));
    console.log(result);
    console.log("─".repeat(50));
  } catch (error) {
    spinner.stop(false, "Content fetch failed");
    throw error;
  }
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

  const spinner = createSpinner("Researching");
  try {
    const result = await you.research(request);
    spinner.stop(true, "Research complete");
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
    spinner.stop(false, "Research failed");
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

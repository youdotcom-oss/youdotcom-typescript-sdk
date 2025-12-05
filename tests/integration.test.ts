/**
 * Integration tests for the You.com SDK
 *
 * These tests make real API calls and require a valid YDC_API_KEY environment variable.
 * Run with: npm run test:integration
 */

import { describe, it, before } from "node:test";
import assert from "node:assert";
import { You } from "../src/index.js";
import type {
  ExpressAgentRunsRequest,
  AdvancedAgentRunsRequest,
  CustomAgentRunsRequest,
  AgentRunsStreamingResponse,
  AgentRunsBatchResponse,
} from "../src/models/index.js";
import type { SearchRequest, ContentsRequest } from "../src/models/operations/index.js";
import { EventStream } from "../src/lib/event-streams.js";

const CUSTOM_AGENT_ID = "63773261-b4de-4d8f-9dfd-cff206a5cb51";

let you: You;

before(() => {
  const apiKey = process.env["YDC_API_KEY"];
  if (!apiKey) {
    throw new Error("YDC_API_KEY environment variable is required to run integration tests");
  }
  you = new You({ apiKeyAuth: apiKey });
});

describe("agentsRuns", () => {
  describe("Express Agent", () => {
    it("batch request returns valid response", async () => {
      const request: ExpressAgentRunsRequest = {
        agent: "express",
        stream: false,
        input: "What is 2 + 2?",
      };

      const result = await you.agentsRuns(request);

      // Type guard: batch response has 'agent' and 'output' properties
      assert.ok("agent" in result, "Response should be a batch response");
      const batchResult = result as AgentRunsBatchResponse;

      assert.strictEqual(batchResult.agent, "express", "Agent should be 'express'");
      assert.ok(Array.isArray(batchResult.output), "Output should be an array");
      assert.ok(batchResult.output.length > 0, "Output should have at least one item");
      assert.ok(Array.isArray(batchResult.input), "Input should be an array");
      assert.ok(batchResult.input.length > 0, "Input should have at least one item");
    });

    it("batch request with web search returns valid response", async () => {
      const request: ExpressAgentRunsRequest = {
        agent: "express",
        stream: false,
        input: "What is the capital of France?",
        tools: [{ type: "web_search" }],
      };

      const result = await you.agentsRuns(request);

      assert.ok("agent" in result, "Response should be a batch response");
      const batchResult = result as AgentRunsBatchResponse;

      assert.strictEqual(batchResult.agent, "express");
      assert.ok(Array.isArray(batchResult.output));
      assert.ok(batchResult.output.length > 0);
    });

    it("streaming request returns event stream", async () => {
      const request: ExpressAgentRunsRequest = {
        agent: "express",
        stream: true,
        input: "What is the capital of Germany?",
      };

      const result = await you.agentsRuns(request);

      // Type guard: streaming response is an EventStream
      assert.ok(result instanceof EventStream, "Response should be an EventStream");
      const stream = result as EventStream<AgentRunsStreamingResponse>;

      const events: AgentRunsStreamingResponse[] = [];
      const eventTypes = new Set<string>();

      for await (const chunk of stream) {
        events.push(chunk);
        eventTypes.add(chunk.data.type);
      }

      assert.ok(events.length > 0, "Should receive at least one event");
      assert.ok(eventTypes.has("response.created"), "Should receive response.created event");
      assert.ok(eventTypes.has("response.done"), "Should receive response.done event");
    });

    it("streaming request with web search returns event stream with content", async () => {
      const request: ExpressAgentRunsRequest = {
        agent: "express",
        stream: true,
        input: "What restaurants are popular in San Francisco?",
        tools: [{ type: "web_search" }],
      };

      const result = await you.agentsRuns(request);

      assert.ok(result instanceof EventStream, "Response should be an EventStream");
      const stream = result as EventStream<AgentRunsStreamingResponse>;

      const events: AgentRunsStreamingResponse[] = [];
      const eventTypes = new Set<string>();
      let hasTextDelta = false;

      for await (const chunk of stream) {
        events.push(chunk);
        eventTypes.add(chunk.data.type);
        if (chunk.data.type === "response.output_text.delta") {
          hasTextDelta = true;
        }
      }

      assert.ok(events.length > 0, "Should receive events");
      assert.ok(eventTypes.has("response.done"), "Should receive response.done event");
      assert.ok(hasTextDelta, "Should receive text delta events");
    });
  });

  describe("Advanced Agent", () => {
    it("streaming request with research tool returns valid response", async () => {
      const request: AdvancedAgentRunsRequest = {
        agent: "advanced",
        stream: true,
        input: "What is the capital of Italy?",
        tools: [{
          type: "research",
          searchEffort: "low",
          reportVerbosity: "medium",
        }],
      };

      const result = await you.agentsRuns(request);

      assert.ok(result instanceof EventStream, "Response should be an EventStream");
      const stream = result as EventStream<AgentRunsStreamingResponse>;

      const events: AgentRunsStreamingResponse[] = [];
      const eventTypes = new Set<string>();

      for await (const chunk of stream) {
        events.push(chunk);
        eventTypes.add(chunk.data.type);
      }

      assert.ok(events.length > 0, "Should receive at least one event");
      assert.ok(eventTypes.has("response.created"), "Should receive response.created event");
      assert.ok(eventTypes.has("response.done"), "Should receive response.done event");
    });
  });

  describe("Custom Agent", () => {
    it("batch request returns valid response", async () => {
      const request: CustomAgentRunsRequest = {
        agent: CUSTOM_AGENT_ID,
        stream: false,
        input: "What is the capital of Spain?",
      };

      const result = await you.agentsRuns(request);

      assert.ok("agent" in result, "Response should be a batch response");
      const batchResult = result as AgentRunsBatchResponse;

      assert.strictEqual(batchResult.agent, CUSTOM_AGENT_ID);
      assert.ok(Array.isArray(batchResult.output));
      assert.ok(batchResult.output.length > 0);
    });
  });
});

describe("search", () => {
  it("returns valid search results", async () => {
    const request: SearchRequest = {
      query: "recipe sites",
    };

    const result = await you.search(request);

    assert.ok(result.metadata, "Response should have metadata");
    assert.ok(result.metadata?.query, "Metadata should have query");
    assert.ok(result.results, "Response should have results");
    assert.ok(result.results?.web, "Results should have web results");
    assert.ok(Array.isArray(result.results?.web), "Web results should be an array");
    assert.ok((result.results?.web?.length ?? 0) > 0, "Web results should not be empty");

    // Verify structure of web results
    const firstResult = result.results?.web?.[0];
    assert.ok(firstResult?.url, "First result should have a URL");
  });

  it("returns results with count parameter", async () => {
    const request: SearchRequest = {
      query: "TypeScript tutorials",
      count: 5,
    };

    const result = await you.search(request);

    assert.ok(result.results?.web, "Results should have web results");
    assert.ok((result.results?.web?.length ?? 0) <= 5, "Should return at most 5 results");
  });
});

describe("contents", () => {
  it("returns page content in markdown format", async () => {
    const request: ContentsRequest = {
      urls: ["https://www.you.com/"],
      format: "markdown",
    };

    const result = await you.contents(request);

    assert.ok(Array.isArray(result), "Response should be an array");
    assert.ok(result.length > 0, "Response should have at least one item");

    const firstContent = result[0];
    assert.ok(firstContent, "First content item should exist");
    assert.ok(firstContent.url, "Content should have a URL");
    assert.ok(
      firstContent.markdown !== undefined || firstContent.html !== undefined,
      "Content should have markdown or html"
    );
  });

  it("returns page content in html format", async () => {
    const request: ContentsRequest = {
      urls: ["https://www.you.com/"],
      format: "html",
    };

    const result = await you.contents(request);

    assert.ok(Array.isArray(result), "Response should be an array");
    assert.ok(result.length > 0, "Response should have at least one item");

    const firstContent = result[0];
    assert.ok(firstContent, "First content item should exist");
    assert.ok(firstContent.url, "Content should have a URL");
  });

  it("returns content for multiple URLs", async () => {
    const request: ContentsRequest = {
      urls: ["https://www.you.com/", "https://www.iana.org/"],
      format: "markdown",
    };

    const result = await you.contents(request);

    assert.ok(Array.isArray(result), "Response should be an array");
    assert.ok(result.length >= 1, "Response should have at least one item");
  });
});


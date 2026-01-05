// Benchmark script comparing curl vs TypeScript SDK search performance
// Run from the examples directory: npx tsx api-performance.ts

import { You, HTTPClient } from "@youdotcom-oss/sdk";
import type { SearchRequest } from "@youdotcom-oss/sdk/models/operations";
import * as readline from "readline/promises";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const ITERATIONS = 10;
const QUERY = "What are the latest geopolitical updates from India";

// Hardcoded response for mock benchmark (removes network latency)
const MOCK_RESPONSE = {
  results: {
    web: [
      {
        url: "https://timesofindia.indiatimes.com/topic/geopolitics/news",
        title: "Geopolitics News | Latest News on Geopolitics - Times of India",
        description:
          "Markets this week: PMI data, geopolitics & more - What will drive Dalal Street? ... Indian markets are poised for a data-driven week, with investors keenly watching domestic PMI readings and key US economic indicators. The earnings season kicks off, adding to the focus on corporate performance. Analysts anticipate a constructive market sentiment, driven by domestic fundamentals, despite potential short-term volatility from ...",
        snippets: [
          "Markets this week: PMI data, geopolitics & more - What will drive Dalal Street? ... Indian markets are poised for a data-driven week, with investors keenly watching domestic PMI readings and key US economic indicators. The earnings season kicks off, adding to the focus on corporate performance. Analysts anticipate a constructive market sentiment, driven by domestic fundamentals, despite potential short-term volatility from global cues and the rupee's movement.",
          "If these two subjects get settled and there are no major issues, prices may correct for some time.\" 'It's a steal': 2008-crisis predictor 'Dr Doom' Peter Schiff advises people to buy gold; flags 'short-term risk' in silver ... India's financial stability report for 2026 highlights domestic resilience amidst global uncertainty. While the banking system is sound, deeper financial linkages between banks and NBFCs amplify contagion risks. External spillovers from geopolitical and trade tensions, coupled with volatile global markets, pose the primary threats, impacting the rupee and increasing market stress.",
          "Check out for the latest news on geopolitics along with geopolitics live news at Times of India",
          "The six-episode series will continue Jonathan Pine's journey as he is drawn back into international espionage to prevent a geopolitical crisis. Expect a broader global scale, deeper dives into arms trafficking, and blurred moral boundaries. Amid high volatility, Guj-based stocks deliver up to 88% returns in 2025 ... Kolkata Knight Riders' signing of Bangladeshi bowler Mustafizur Rahman for the 2026 IPL has sparked a political firestorm. BJP leaders and religious groups are protesting, citing strained India-Bangladesh ties and alleged violence against minorities.",
        ],
        thumbnail_url: "https://static.toiimg.com/photo/47529300.cms",
        favicon_url:
          "https://you.com/favicon?domain=timesofindia.indiatimes.com&size=128",
      },
    ],
    news: [
      {
        url: "https://www.moneycontrol.com/news/business/markets/moneycontrol-pro-market-outlook-record-highs-amid-rising-geopolitical-tensions-13755777.html",
        title:
          "Moneycontrol Pro Market Outlook | Record highs amid rising geopolitical tensions",
        description:
          "Indian equities began 2026 strongly as Nifty50 hit a record, extending weekly gains, led by autos and earnings optimism, with midcaps outperforming despite FII selling",
        thumbnail_url:
          "https://images.moneycontrol.com/static-mcnews/2025/12/20251222093233_Market_up1.jpeg",
        page_age: "2026-01-05T02:13:57",
      },
    ],
  },
  metadata: {
    query: "What are the latest geopolitical updates from India",
    search_uuid: "e707f386-8034-4362-a97a-07deb89944ff",
    latency: 0.4810364246368408,
  },
};

async function runCurlBenchmark(apiKey: string): Promise<number[]> {
  const times: number[] = [];

  console.log("\n🌐 Running curl benchmark...\n");

  // Build a single curl command with --next to chain requests
  // This allows curl to reuse the TCP/TLS connection (like the SDK does)
  const baseArgs = `-s -G "https://ydc-index.io/v1/search" -H "X-API-Key: ${apiKey}" --data-urlencode "query=${QUERY}" -d count=1 -w "%{time_total}\\n" -o /dev/null`;

  const curlParts: string[] = [];
  for (let i = 0; i < ITERATIONS; i++) {
    curlParts.push(baseArgs);
  }

  // Join with --next to chain requests in a single curl process (enables connection reuse)
  const curlCommand = `curl ${curlParts.join(" --next ")}`;

  const { stdout } = await execAsync(curlCommand);
  const timings = stdout.trim().split("\n");

  for (let i = 0; i < timings.length; i++) {
    const totalTimeSeconds = parseFloat(timings[i]!);
    const totalTimeMs = totalTimeSeconds * 1000;
    times.push(totalTimeMs);
    console.log(`   Run ${i + 1}: ${totalTimeMs.toFixed(2)} ms`);
  }

  return times;
}

async function runTypeScriptBenchmark(you: You): Promise<number[]> {
  const times: number[] = [];

  console.log("\n📦 Running TypeScript SDK benchmark...\n");

  for (let i = 0; i < ITERATIONS; i++) {
    const request: SearchRequest = {
      query: QUERY,
      count: 1,
    };

    const startTime = performance.now();
    await you.search(request);
    const endTime = performance.now();

    const duration = endTime - startTime;
    times.push(duration);

    console.log(`   Run ${i + 1}: ${duration.toFixed(2)} ms`);
  }

  return times;
}

async function runMockedSdkBenchmark(): Promise<number[]> {
  const times: number[] = [];

  console.log("\n🧪 Running TypeScript SDK benchmark (mocked network)...\n");

  // Create a mock fetcher that returns the hardcoded response instantly
  const mockFetcher = async (): Promise<Response> => {
    return new Response(JSON.stringify(MOCK_RESPONSE), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  // Create an HTTPClient with the mock fetcher
  const mockHttpClient = new HTTPClient({ fetcher: mockFetcher });

  // Create a You instance with the mock HTTP client
  const mockedYou = new You({
    apiKeyAuth: "mock-api-key",
    httpClient: mockHttpClient,
  });

  for (let i = 0; i < ITERATIONS; i++) {
    const request: SearchRequest = {
      query: QUERY,
      count: 1,
    };

    const startTime = performance.now();
    await mockedYou.search(request);
    const endTime = performance.now();

    const duration = endTime - startTime;
    times.push(duration);

    console.log(`   Run ${i + 1}: ${duration.toFixed(2)} ms`);
  }

  return times;
}

function calculateStats(times: number[]) {
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);
  return { avg, min, max };
}

function printResults(label: string, times: number[]) {
  const stats = calculateStats(times);
  console.log(`\n📊 ${label} Results:`);
  console.log(`   Average: ${stats.avg.toFixed(2)} ms`);
  console.log(`   Min:     ${stats.min.toFixed(2)} ms`);
  console.log(`   Max:     ${stats.max.toFixed(2)} ms`);
  return stats;
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║   Search API Benchmark: curl vs TypeScript SDK     ║");
    console.log("╚════════════════════════════════════════════════════╝");

    const apiKey = await rl.question("\n🔑 Enter your API key: ");
    if (!apiKey.trim()) {
      console.log("❌ API key is required.");
      return;
    }

    const you = new You({
      apiKeyAuth: apiKey.trim(),
    });

    console.log(`\n🔄 Running ${ITERATIONS} iterations each...`);
    console.log(`📝 Query: "${QUERY}"`);

    // Run curl benchmark
    const curlTimes = await runCurlBenchmark(apiKey.trim());
    const curlStats = printResults("curl", curlTimes);

    // Run TypeScript SDK benchmark
    const tsTimes = await runTypeScriptBenchmark(you);
    const tsStats = printResults("TypeScript SDK", tsTimes);

    // Run mocked SDK benchmark (no network latency)
    const mockedTimes = await runMockedSdkBenchmark();
    const mockedStats = printResults("TypeScript SDK (Mocked)", mockedTimes);

    // Comparison
    console.log("\n═══════════════════════════════════════════════════════");
    console.log("📈 COMPARISON");
    console.log("═══════════════════════════════════════════════════════");

    const diff = tsStats.avg - curlStats.avg;
    const ratio = tsStats.avg / curlStats.avg;

    console.log("\n📊 curl vs TypeScript SDK (with network):");
    if (diff > 0) {
      console.log(`   TypeScript SDK is ${diff.toFixed(2)} ms slower on average`);
      console.log(`   TypeScript SDK is ${ratio.toFixed(2)}x slower than curl`);
    } else {
      console.log(`   TypeScript SDK is ${Math.abs(diff).toFixed(2)} ms faster on average`);
      console.log(`   TypeScript SDK is ${(1 / ratio).toFixed(2)}x faster than curl`);
    }

    // SDK overhead analysis
    const sdkOverhead = mockedStats.avg;
    const totalSdkTime = tsStats.avg;

    console.log("\n📊 SDK Performance Breakdown:");
    console.log(`   SDK processing overhead:           ${sdkOverhead.toFixed(2)} ms`);
    console.log(`   Total SDK time (with network):     ${totalSdkTime.toFixed(2)} ms`);
    console.log(`   SDK overhead as % of total:        ${((sdkOverhead / totalSdkTime) * 100).toFixed(1)}%`);

    console.log("\n");
  } finally {
    rl.close();
  }
}

main();

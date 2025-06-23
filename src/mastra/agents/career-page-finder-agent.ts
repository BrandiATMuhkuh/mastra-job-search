import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { webSearchTool } from "../tools/websearch-tool";
import { z } from "zod";

export const careerPageFinderAgent = new Agent({
  name: "Career Page Finder Agent",
  instructions: `
Given a company name, job ad, or website, your first task is to find one or more official webpages for the company (such as the homepage or main domains). Next, use these to find the official careers page(s) for that company. Use web search to identify the most relevant careers, jobs, or employment pages directly from the company's own website.

- You MUST use the tool web_search_tool or the web_search_preview tool to search the web.
- If there are multiple relevant careers or jobs pages (e.g., for different regions or divisions), you can return more than one.
- Do not return results from third-party job boards; only official company pages.
- If your first search does not yield a clear or relevant result, you should retry with different queries or approaches until you find the correct page(s) or exhaust reasonable options.
- You MUST verify that each page you return actually exists and is not hallucinated. Only return real, accessible URLs that you have confirmed exist.
  `,
  model: openai("gpt-4.1"),
  tools: {
    web_search_tool: webSearchTool,
  },
  // Limits the number of tool call steps and retries per request (Mastra defaults)
  defaultGenerateOptions: {
    maxSteps: 10,
    maxRetries: 2,
  },
});

import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const webSearchTool = createTool({
  id: "web-search",
  description:
    "Searches the web. Provide a query string. If you prefix a URL with 'site:', the tool will search only that site.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "The query to search for. Prefix with 'site:' to restrict to a specific site."
      ),
  }),
  outputSchema: z.string(),
  execute: async ({ context }) => {
    const { query } = context;
    const result = await generateText({
      model: openai.responses("gpt-4.1"),
      prompt: query,
      tools: {
        web_search_preview: openai.tools.webSearchPreview({
          searchContextSize: "high",
        }),
      },
      toolChoice: { type: "tool", toolName: "web_search_preview" },
    });
    return result.text;
  },
});

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // now v3

const server = new McpServer({ name: "google-docs-mcp", version: "0.1.0" });

// No inputs → omit inputSchema entirely (don’t pass {})
server.registerTool(
  "health-check",
  {
    title: "Health Check",
    description: "Verify the MCP server is running",
  },
  async () => ({ content: [{ type: "text", text: "MCP server is running 🚀" }] })
);

// Inputs → shape form (plain object of Zod fields)
server.registerTool(
  "get-doc",
  {
    title: "Get Google Doc",
    description: "Fetch a Google Doc by ID",
    inputSchema: { docId: z.string() },
  },
  async ({ docId }) => ({
    content: [{ type: "text", text: `Fetched doc ${docId}` }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);

// IMPORTANT: log to stderr, never stdout
console.error("✅ MCP server connected over stdio. Ready.");

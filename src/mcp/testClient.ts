// src/mcp/testClient.ts
// Canonical imports per the SDK README:
import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  // Spawn your local server via stdio
  const transport = new StdioClientTransport({
    command: process.env.MCP_CMD || "bun",
    args:
      (process.env.MCP_ARGS && JSON.parse(process.env.MCP_ARGS)) ||
      ["run", "src/mcp/index.ts"],
  });

  // REQUIRED: clientInfo (name + version)
  const client = new Client({
    name: "local-test-client",
    version: "0.1.0",
  });

  // Connect using the transport
  await client.connect(transport);

  // Sanity: list tools (also validates schemas)
  const listed = await client.listTools();
  console.log("🔧 tools:", listed.tools.map(t => t.name));

  // Call your health-check tool
  const resp = await client.callTool("health-check", {});
  console.log("🩺 health-check response:", resp);

  await client.close();
  console.log("👋 client closed.");
}

main().catch(err => {
  console.error("❌ test client failed:", err);
  process.exit(1);
});

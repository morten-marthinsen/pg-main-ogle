# gcloud Extension for Gemini CLI ☁️

The gcloud
[Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro)
server enables AI assistants to easily interact with the Google Cloud
environment using the gcloud CLI. With the gcloud MCP server you can:

-   **Interact with Google Cloud using natural language.** Describe the outcome
    you want instead of memorizing complex command syntax, flags, and arguments.
-   **Automate and simplify complex workflows.** Chain multiple cloud operations
    into a single, repeatable command to reduce manual effort and the chance of
    error.
-   **Lower the barrier to entry for cloud management.** Empower team members
    who are less familiar with gcloud to perform powerful actions confidently
    and safely.

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
    version 20 or higher
-   [gcloud CLI](https://cloud.google.com/sdk/docs/install)

## ✨ Install the Extension

### Gemini CLI and Gemini Code Assist

To integrate this extension with Gemini CLI or Gemini Code Assist, run the setup
command below. This will install the MCP server as a
[Gemini CLI extension](https://github.com/google-gemini/gemini-cli/blob/main/docs/extension.md)
for the current user, making it available for all your projects. Refer to 
[Gemini CLI extension management](https://github.com/google-gemini/gemini-cli/blob/main/docs/extension.md#extension-management)
for uninstall, disable, enable, and update instructions.

```shell
gemini extensions install https://github.com/gemini-cli-extensions/gcloud
```

After the initialization process, you can verify that the gcloud-mcp server is
configured correctly by running the following command:

```
gemini mcp list

> ✓ gcloud: npx -y @google-cloud/gcloud-mcp (stdio) - Connected
```

### For other AI clients

See github.com/googleapis/gcloud-mcp for instructions on using the gcloud MCP
server with other AI clients.

## 🧰 Available MCP Tools

| Tool                      | Description                     |
| ------------------------- | ------------------------------- |
| `run_gcloud_command`      | Executes a gcloud command. Some commands have been restricted from execution by the agent. See [MCP Permissions](#-mcp-permissions) for more information. |

## 🔑 MCP Permissions

The permissions of the gcloud MCP extension are directly tied to the permissions of the active
gcloud account. To restrict permissions and operate with the principle of least
privilege, you can
[authorize as a service account using impersonation](https://cloud.google.com/sdk/docs/authorizing#impersonation) and
assign the service account a
[role with limited permissions](https://cloud.google.com/iam/docs/roles-overview).

By default, the gcloud MCP extension prevents execution of gcloud commands that don't
make sense for AI agents. This is done to restrict commands that can run
arbitrary inputs and initiate interactive sessions. See
[here](https://github.com/googleapis/gcloud-mcp/blob/ed743f04272744e57aa4990f5fcd9816a05b03ba/packages/gcloud-mcp/src/index.ts#L29)
for the list of denied commands.

## 👥 Contributing

We welcome contributions! Whether you're fixing bugs, sharing feedback, or
improving documentation, your contributions are welcome. Please read our
[Contributing Guide](CONTRIBUTING.md) to get started.

## 📄 Important Notes

This repository is currently in preview and may see breaking changes. This
repository is providing a solution, not an officially supported Google product.
It may break when the MCP specification, other SDKs, or when other solutions and
products change. See also our [Security Policy](SECURITY.md).

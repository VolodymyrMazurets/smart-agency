# Pipedrive API

## Setup

Plugin: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Add next code to the `.vscode/settings.json` file:

```json
{
  "rest-client.environmentVariables": {
    "$shared": {
        "dev_url": "https://xcelleratebiz-38a0b5.pipedrive.com/api/v1/deals?api_token=ed165e945df0075733ed5c0d000f78122c435e8f",
    },
  }
}
```
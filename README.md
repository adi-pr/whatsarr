# Whatsarr

Whatsarr is a TypeScript webhook bridge that receives Sonarr/Radarr-style webhook payloads and sends WhatsApp notifications using `whatsapp-web.js`.

## Current Status

The project currently provides:

- An Express server with a webhook endpoint.
- WhatsApp Web authentication via QR code and local session persistence.
- Sonarr event routing with implemented handlers for:
	- `Test`
	- `Grab`
	- `SeriesAdd`
	- `SeriesDelete`
	- `Health`
	- `HealthRestored`
	- `ManualInteractionRequired`

## How It Works

1. The app starts and initializes the WhatsApp client.
2. On first run, a QR code is printed in the terminal.
3. After scanning the QR, the client becomes ready and sends a startup message.
4. Sonarr sends webhook events to the app.
5. The event router dispatches to the matching handler and sends a WhatsApp message.

## Project Structure

```text
index.ts                             # Express app and webhook routes
config/env.ts                        # Environment loading/validation
src/handlers/handler.ts              # Generic event dispatcher
src/handlers/sonarr/                 # Sonarr event handlers
src/whatsapp/client.ts               # whatsapp-web.js client setup
src/utils/buildImageUrl.ts           # Relative/absolute image URL helper
types/index.ts                       # Webhook payload union type
types/sonarr.d.ts                    # Sonarr webhook types
types/radarr.d.ts                    # Radarr webhook type
docker/docker-compose.yml            # Optional Sonarr/Prowlarr/Transmission stack
```

## Requirements

- Node.js 20+
- npm
- A WhatsApp account that can complete QR login

## Installation

```bash
npm install
```

## Environment Variables

Copy `example.env` and configure values:

```env
GROUP_ID=123456789@g.us
ADMIN_NUMBERS=5921233456@c.us,5921234567@c.us
PORT=3000
WHATSAPP_SESSION_PATH=
```

Notes:

- At least one of `ADMIN_NUMBERS` or `GROUP_ID` must be configured.
- `ADMIN_NUMBERS` and `GROUP_ID` support comma-separated values.
- The server listens on `PORT` (default `3000`).
- Runtime sends event notifications to the first configured target (`ALLIDS[0]`).
- On WhatsApp client ready, startup notifications are sent to all configured IDs.

## Run Locally

```bash
npm run dev
```

When starting for the first time, scan the terminal QR code to authenticate WhatsApp Web.

Session files are stored under `wwebjs_cache/`.

## HTTP API

### Health Check

- Method: `GET`
- Path: `/`
- Response: `Server is running`

### Webhook Endpoint

- Method: `POST`
- Path: `/webhook/send-message`
- Body: JSON Sonarr/Radarr webhook payload

If a handler exists, the endpoint returns:

```json
{ "success": true }
```

If event processing throws, the endpoint returns:

```text
400 Bad Request
```

If no event handler is found, the app logs the warning and sends an error message to the first configured WhatsApp target.

## Implemented Sonarr Event Behavior

- `Test`: Sends a formatted test summary message.
- `Grab`: Sends a detailed release message and tries to include poster media.
- `SeriesAdd`: Sends poster media (if available) with a short caption.
- `SeriesDelete`: Sends poster media (if available) with a short caption.
- `Health` / `HealthRestored`: Sends health status summary.
- `ManualInteractionRequired`: Sends manual interaction status summary.

## Quick Local Webhook Test

```bash
curl -X POST http://localhost:3000/webhook/send-message \
	-H "Content-Type: application/json" \
	-d '{
		"eventType": "Test",
		"series": {
			"id": 1,
			"title": "Example Show",
			"path": "/tv/example-show",
			"tvdbId": 123,
			"type": "standard",
			"year": 2024,
			"tags": []
		},
		"episodes": [
			{ "id": 10, "episodeNumber": 1, "seasonNumber": 1, "title": "Pilot", "seriesId": 1, "tvdbId": 1001 }
		],
		"instanceName": "Sonarr",
		"applicationUrl": "http://localhost:8989"
	}'
```

## Optional Docker Stack (for local Sonarr testing)

An optional stack is available in `docker/docker-compose.yml`:

- Sonarr on `http://localhost:8989`
- Prowlarr on `http://localhost:9696`
- Transmission on `http://localhost:9091`

Run:

```bash
cd docker
docker compose up -d
```

Stop:

```bash
docker compose down
```

## Development Notes

- Entrypoint: `index.ts`
- Event router: `src/handlers/handler.ts`
- *arr handlers: `src/handlers/*arr/index.ts`
- Type definitions: `types/*arr.d.ts`, `types/index.ts`

## Known Gaps

- Radarr payload types exist, but there are currently no Radarr-specific handlers wired in.
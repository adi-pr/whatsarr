# Whatsarr

Whatsarr is a small TypeScript service that receives media manager webhooks and forwards notifications to WhatsApp using `whatsapp-web.js`.

Current implementation status:

- Exposes an HTTP webhook endpoint with Express.
- Initializes a WhatsApp Web client with local session persistence.

## How It Works

1. The server starts and initializes WhatsApp.
2. You scan the QR code printed in the terminal.
3. Sonarr or Radarr sends webhook requests to the app.
4. The app routes events to handlers.
5. Handler logic sends WhatsApp messages.

## Project Structure

```text
index.ts                    # Express server and webhook endpoint
src/handlers/handler.ts     # Generic event router
src/handlers/sonarr/        # Sonarr-specific handlers
src/whatsapp/client.ts      # WhatsApp client initialization
types/                      # Webhook payload typings
docker/docker-compose.yml   # Optional Sonarr test service
```

## Requirements

- Node.js 20+
- npm
- A WhatsApp account that can complete QR login

## Install

```bash
npm install
```

## Run Locally

This project currently has no npm scripts, so run it directly with `tsx`:

```bash
npx tsx index.ts
```

On startup you should see a QR code in the terminal. Scan it to authenticate the WhatsApp session.

Session data is stored under `wwebjs_cache/`.

## HTTP API

### Health Route

- Method: `GET`
- Path: `/`
- Response: `Server is running`

### Webhook Route

- Method: `POST`
- Path: `/webhook/send-message`


## Event Handling

Current event support:

- Sonarr `Test` -> handled by `src/handlers/sonarr/onTest.ts`

Unknown events are logged and return:

```json
{ "success": false, "error": "No handler for this event type" }
```

## Optional: Run Sonarr With Docker

An example Sonarr service is included for local testing:

```bash
cd docker
docker compose up -d
```

Default Sonarr URL: `http://localhost:8989`

## Development Notes

- Payload types are defined in `types/sonar.d.ts` and `types/radarr.d.ts`.
- `types/index.ts` exports the union used by the webhook endpoint.
- The webhook route currently logs event handling results and can be extended with richer message templates.

## Roadmap Ideas

- Add handlers for Sonarr `Grab`, `Download`, `Rename`, `Health`, and `ManualInteractionRequired`.
- Add Radarr-specific event handlers.
- Add Redis to handle incoming logs from multiple services

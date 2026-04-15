# Setup Helper Script

This folder contains a small WhatsApp setup utility used to discover the IDs you need for environment configuration.

## File

- `index.ts`: Starts a temporary WhatsApp Web client and replies with chat/user IDs when it receives the `!setup` command.

## What the Script Does

1. Creates a `whatsapp-web.js` client.
2. Prints a QR code in the terminal.
3. Waits for messages.
4. When you send `!setup`, it responds with IDs:
   - In a group chat: returns `Group ID` and `User ID`.
   - In a direct chat: returns `User ID`.

## Run the Script

From the project root:

```bash
npm run setup
```

Then scan the QR code with WhatsApp.

## How to Use the Output IDs

Take the values returned by `!setup` and add them to your `.env`:

- Put group IDs (ending in `@g.us`) in `GROUP_ID`.
- Put user IDs (usually ending in `@c.us`) in `ADMIN_NUMBERS`.

Example:

```env
GROUP_ID=1234567890-123456789@g.us
ADMIN_NUMBERS=5921234567@c.us,5929999999@c.us
```

You can provide multiple values as comma-separated lists.

## Notes

- Keep IDs exactly as returned (including `@g.us` / `@c.us`).
- The main app requires at least one value in `GROUP_ID` or `ADMIN_NUMBERS`.

import { handleEvent } from "./src/handlers/handler";
import { client } from "./src/whatsapp/client";
import type { WebhookPayload } from "./types";
import express from "express";

import env from "./config/env";

await client.initialize();

const app = express();

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Server is running");
});

app.post("/webhook/send-message", async (req: express.Request, res: express.Response) => {
    try {
        const payload = req.body as WebhookPayload;

        console.log("Received webhook payload:", payload);

        const result = await handleEvent(payload);

        console.log("Event handling result:", result);

        if (!result.success) {
            client.sendMessage(env.ALLIDS[0], `Error handling event: ${payload.eventType}`);
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(400).send("Bad Request");
    }
});

app.use((req: express.Request, res: express.Response) => {
    res.status(404).send("Not Found");
});

app.listen(env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${env.PORT || 3000}`);
});

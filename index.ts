import { client, sendMessage } from "./src/whatsapp/client";
import type { WebhookPayload } from "./types";
import express from "express";

await client.initialize();

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Server is running");
});

app.post("/webhook/send-message", async (req: express.Request, res: express.Response) => {
    try {
        const payload = req.body as WebhookPayload;

        console.log("Received webhook payload:", payload.eventType);

        // const message = `New item: ${
        //   payload.series?.title || payload.movie?.title
        // }`;

        // await sendMessage(message);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(400).send("Bad Request");
    }
});

app.use((req: express.Request, res: express.Response) => {
    res.status(404).send("Not Found");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

import server from "bunrest";
import { client, sendMessage } from "./src/whatsapp/client";
import type { RadarrWebhookPayload } from "./types/radarr";

const app = server();

app.listen(3000, async () => {
    console.log("WhatsApp client is initializing...");
    await client.initialize();
    console.log("Server is running on http://localhost:3000");
});

app.post('/webhook/send-message', async (req, res) => {
    const payload = req.body as RadarrWebhookPayload;
    
    const message = `New movie added: ${payload.movie.title} (${payload.movie.year})`;
    sendMessage(message);

    return res.status(200).send({ success: true });
})
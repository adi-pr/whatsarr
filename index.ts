import { client } from "./src/whatsapp/client";
import messageQueue from "./src/utils/queue";
import startWorker from "./src/utils/worker";
import type { WebhookPayload } from "./types";
import express from "express";

import env from "./config/env";

startWorker();
await client.initialize();

const app = express();

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Server is running");
});

app.post("/webhook/send-message", async (req: express.Request, res: express.Response) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Basic ')) {
      return res.status(401).send("Unauthorized");
    }
  
    const credentials = Buffer.from(auth.slice(6), "base64").toString("utf-8");
    
    const [username, password] = credentials.split(":");
    if (username !== env.WEBHOOK_USER || password !== env.WEBHOOK_PASSWORD) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      const payload = req.body as WebhookPayload;
      
      if (!payload) {
        return res.status(400).send("Bad Request");
      }
  
      console.log("Received webhook payload:", payload);
  
      await messageQueue.add("message-queue", payload);
  
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

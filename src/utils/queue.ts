import { Queue } from "bullmq";
import { WebhookPayload } from "../../types";

// TODO: replace with envs
const connection = {
  host: "127.0.0.1", 
  port: 6379,
}

const messageQueue = new Queue<WebhookPayload>("message-queue", { connection });

export default messageQueue;
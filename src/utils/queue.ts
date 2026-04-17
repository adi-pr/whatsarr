import { Queue } from "bullmq";
import { WebhookPayload } from "../../types";
import env from "../../config/env";

// TODO: replace with envs
const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
}

const messageQueue = new Queue<WebhookPayload>("message-queue", { connection });

export default messageQueue;
import { Worker } from "bullmq";
import { WebhookPayload } from "../../types";
import { handleEvent } from "../handlers/handler";
import env from "../../config/env";

export default function startWorker() {
  const worker = new Worker<WebhookPayload>("message-queue", async (job) => {
    const { data } = job;

    const result = await handleEvent(data);
    return result;
  },
  {
    connection: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
    concurrency: 5,
  });

  return worker;
}
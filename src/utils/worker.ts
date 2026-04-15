import { Worker } from "bullmq";
import { WebhookPayload } from "../../types";
import { handleEvent } from "../handlers/handler";

export default function startWorker() {
  const worker = new Worker<WebhookPayload>("message-queue", async (job) => {
    const { data } = job;

    const result = await handleEvent(data);
    return result;
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
    concurrency: 5,
  });

  return worker;
}
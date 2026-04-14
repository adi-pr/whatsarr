import { client, sendMessage } from "./src/whatsapp/client";
import type { WebhookPayload } from "./types";

await client.initialize();

// Bun.serve({
//   port: 3000,
//   async fetch(req) {
//     const url = new URL(req.url);

//     if (req.method === "GET" && url.pathname === "/") {
//       return new Response("Server is running");
//     }

//     if (req.method === "POST" && url.pathname === "/webhook/send-message") {
//       try {
//         const payload = (await req.json()) as WebhookPayload;

//         console.log("Received webhook payload:", payload.eventType);

//         // const message = `New item: ${
//         //   payload.series?.title || payload.movie?.title
//         // }`;

//         // await sendMessage(message);

//         return new Response(JSON.stringify({ success: true }), {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         });
//       } catch (err) {
//         console.error(err);
//         return new Response("Bad Request", { status: 400 });
//       }
//     }

//     return new Response("Not Found", { status: 404 });
//   },
// });

console.log("Server running on http://localhost:3000");
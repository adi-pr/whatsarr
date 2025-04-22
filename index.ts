import server from "bunrest";
import { client } from "./src/whatsapp/client";


const app = server();
app.listen(3000, async () => {
    console.log("WhatsApp client is initializing...");
    await client.initialize();
    console.log("Server is running on http://localhost:3000");
}
);
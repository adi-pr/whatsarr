import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client } = pkg;

// Create a new client instance
const client = new Client({});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('message_create', async (message) => {
    if (message.body.trim() === '!setup') {
        const chat = await message.getChat();

        if (chat.isGroup) {
            const groupId = chat.id._serialized;
            const userId = message.author ?? message.from;
            await message.reply(`Group ID: ${groupId}\nUser ID: ${userId}`);
        } else {
            const userId = message.from;
            await message.reply(`User ID: ${userId}`);
        }
    }
});

// Start your client
client.initialize();

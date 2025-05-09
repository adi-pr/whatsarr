import { Client, LocalAuth } from "whatsapp-web.js";
// import * as qrcode from "qrcode-terminal";

const adminContactIDs = process.env.ADMIN_NUMBERS?.split(',') || [];
export const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: '../../wwebjs_cache'
    }),
});

export function sendMessage(content: string) {
    adminContactIDs.forEach((contactId) => {
        client.sendMessage(contactId, content);
    })
}

client.on('ready', async () => {
    console.log('Client is ready!');

    // adminContactIDs.forEach((contactId) => {
    //     client.sendMessage(contactId, 'WhatsApp bot is online!');
    // })
})

// client.on('qr', (qr) => {
//     qrcode.generate(qr, {small: true});
// });

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.on('auth_failure', () => {
    console.error('Authentication failed');
});
import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import path from 'path';

const { Client, LocalAuth } = pkg;

const adminContactIDs = process.env.ADMIN_NUMBERS?.split(',') || [];

export const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.resolve('./wwebjs_cache'),
        clientId: "whatsarr-bot"
    }),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('Client authenticated');
});

export function sendMessage(content: string) {
    adminContactIDs.forEach((contactId) => {
        client.sendMessage(contactId, content);
    })
}

client.on('ready', async () => {
    console.log('Client is ready!');

    client.sendMessage("120363425693415045@g.us", 'WhatsApp bot is online!');

})

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.on('auth_failure', () => {
    console.error('Authentication failed');
});

client.on('change_state', state => {
    console.log('STATE:', state);
});
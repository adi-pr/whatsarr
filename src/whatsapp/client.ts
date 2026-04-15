import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import path from 'path';
import env from "../../config/env";

const { Client, LocalAuth } = pkg;

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

client.on('ready', async () => {
    console.log('Client is ready!');

    env.ALLIDS.forEach(id => {
        client.sendMessage(id, 'Whatsarr is online!');
    });
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
const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const allSessionsObject = {};


// Create a new client instance
const client = new Client({
    puppeteer: {
        headless: true
        },
    authStrategy: new LocalAuth({
        clientId: 'my-client',
    }),

    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
    
});

// When the client is ready, run this code (only once)

// When the client received QR-Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log(await client.getWWebVersion());
    console.log('Client is ready!');
});



client.on('message', async (message) => {
    try {
        if (message.from != 'status@broadcast') {
            const contact = await message.getContact();
            console.log(contact , message.body);
        }
       
    } catch (error) {
        console.log(error);
    }
   
});



// Start your client
client.initialize();

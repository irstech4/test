const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth(),
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



client.on('message', message => {
    if (message.body === 'hi') {
        message.reply('pong');
    }
});



// Start your client
client.initialize();

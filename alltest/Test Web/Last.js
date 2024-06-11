const express = require('express');
const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');
const { MongoStore } = require('wwebjs-mongo');
const connectDB = require('./db/database');
const app = express();
const PORT = 6200;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Ensure MongoDB connection is established before proceeding
mongoose.connection.once('open', () => {
  console.log('MongoDB connection established');

  const initializeClient = (sessionName) => {
    const store = new MongoStore({ mongoose: mongoose});

    // Initialize the client
    console.log(`Initializing client for session ${sessionName}...`);
    console.log(`Store: ${store}`);

    

    const client = new Client({
      puppeteer: {
        headless: true,
      },
      authStrategy: new RemoteAuth({
        clientId: sessionName,
        store: store,
        backupSyncIntervalMs: 300000,
      }),
      webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
      },
    });

    const userStates = new Map();

    const STATES = {
      GREETING: 'greeting',
      MAIN_MENU: 'main_menu',
      QUERY: 'query',
      FOLLOW_UP: 'follow_up',
    };

    client.on('qr', (qr) => {
      console.log(`QR RECEIVED for session ${sessionName}`);
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', async () => {
      console.log(`Client ${sessionName} is ready!`);
    });

    client.on('message', async (message) => {
      try {
        if (message.from !== 'status@broadcast') {
           message = message.body;
          console.log(message);

        }
      } catch (error) {
        console.log(error);
      }
    });

    client.initialize();
  };

  const checkAndInitializeClient = async (sessionName) => {
    const store = new MongoStore({ mongoose: mongoose, session: sessionName });
    const sessionExists = await store.sessionExists({ session: sessionName });

    if (sessionExists) {
      console.log(`Session ${sessionName} already exists. Reconnecting...`);
      initializeClient(sessionName);
    } else {
      console.log(`Session ${sessionName} does not exist. Generating new session...`);
      initializeClient(sessionName);
    }
  };

  checkAndInitializeClient('Hello123');

});

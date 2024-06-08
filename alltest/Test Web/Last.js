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
    const store = new MongoStore({ mongoose: mongoose, session: sessionName });

    const client = new Client({
      puppeteer: {
        headless: true,
      },
      authStrategy: new RemoteAuth({
        store: store,
        dataPath: `./sessions/${sessionName}`, // Change directory to avoid permission issues
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
          const contact = await message.getContact();
          const userId = contact.id._serialized;

          if (!userStates.has(userId)) {
            userStates.set(userId, STATES.GREETING);
          }

          const currentState = userStates.get(userId);

          switch (currentState) {
            case STATES.GREETING:
              await message.reply(`Hi ${contact.pushname}, welcome to our service! How can I assist you today?`);
              userStates.set(userId, STATES.MAIN_MENU);
              break;

            case STATES.MAIN_MENU:
              const buttons = new Buttons(
                'Please choose an option below:',
                [
                  { body: 'Get Info' },
                  { body: 'Ask a Question' },
                  { body: 'Contact Support' },
                ],
                'Main Menu',
                'Select an option'
              );
              await client.sendMessage(message.from, buttons);
              userStates.set(userId, STATES.OPTION_SELECTED);
              break;

            case STATES.OPTION_SELECTED:
              if (message.body === 'Get Info') {
                await message.reply('Here is the information you requested...');
                userStates.set(userId, STATES.MAIN_MENU);
              } else if (message.body === 'Ask a Question') {
                await message.reply('Please type your question.');
                userStates.set(userId, STATES.QUERY_HANDLING);
              } else if (message.body === 'Contact Support') {
                await message.reply('You can reach support at support@example.com');
                userStates.set(userId, STATES.FOLLOW_UP);
              } else {
                await message.reply('Please select a valid option from the buttons.');
                userStates.set(userId, STATES.MAIN_MENU);
              }
              break;

            case STATES.QUERY_HANDLING:
              await message.reply('Thank you for your question. We will get back to you shortly.');
              userStates.set(userId, STATES.FOLLOW_UP);
              break;

            case STATES.FOLLOW_UP:
              const list = new List(
                'Do you need further assistance?',
                'Choose an option',
                [
                  {
                    title: 'Options',
                    rows: [
                      { id: 'yes', title: 'Yes', description: 'I need more help' },
                      { id: 'no', title: 'No', description: 'I am good, thanks' },
                    ],
                  },
                ],
                'Follow Up',
                'Please select'
              );
              await client.sendMessage(message.from, list);
              userStates.set(userId, STATES.MAIN_MENU);
              break;

            default:
              await message.reply('I am not sure how to help with that. Please start again.');
              userStates.set(userId, STATES.GREETING);
              break;
          }
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

  checkAndInitializeClient('client1');

});

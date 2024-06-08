const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");

const qrcode = require("qrcode-terminal");
const app = express();
const PORT = 4100;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const client = new Client({
  puppeteer: {
    headless: true,
  },
  authStrategy: new LocalAuth({
    clientId: "my-client",
  }),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

const userStates = new Map();

const STATES = {
  GREETING: "greeting",
  MAIN_MENU: "main_menu",
  QUERY: "query",
  FOLLOW_UP: "follow_up",
};

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log(await client.getWWebVersion());
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  try {
    if (message.from !== "status@broadcast") {
      const contact = await message.getContact();
      const userId = contact.id._serialized;

      if (!userStates.has(userId)) {
        userStates.set(userId, STATES.GREETING);
      }

      const currentState = userStates.get(userId);

      switch (currentState) {
        case STATES.GREETING:
          await message.reply(
            `Hi ${contact.pushname}, how are you? This is a message from the bot.`
          );
          userStates.set(userId, STATES.MAIN_MENU);
          console.log(`Greeted ${contact.pushname} for the first time.`);
          break;

        case STATES.MAIN_MENU:
          await message.reply("How can I assist you today?");
          userStates.set(userId, STATES.QUERY);
          console.log(`Asked ${contact.pushname} for their query.`);
          break;

        case STATES.QUERY:
          await message.reply(
            "Thank you for your query. We will get back to you shortly."
          );
          userStates.set(userId, STATES.FOLLOW_UP);
          console.log(`Received query from ${contact.pushname}.`);
          break;

        case STATES.FOLLOW_UP:
          await message.reply("Is there anything else you need help with?");
          userStates.set(userId, STATES.MAIN_MENU);
          console.log(`Followed up with ${contact.pushname}.`);
          break;

        default:
          await message.reply(
            "I am not sure how to help with that. Please start again."
          );
          userStates.set(userId, STATES.GREETING);
          console.log(`Resetting state for ${contact.pushname}.`);
          break;
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendMessage", async (req, res) => {

    const { message, number, clientId} = req.body
    console.log(req.body)

    try {
        const result = await client.sendMessage(number, message, clientId)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

});

client.initialize();

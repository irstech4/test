import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Buttons, Client, MessageMedia, RemoteAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { MongoStore } from 'wwebjs-mongo';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Instance } from 'src/instances/schema/instance.schema';

@Injectable()
export class AltWhatsappService {
  private clients: { [key: string]: Client } = {};
  private qrCodeData = {}; // Store QR code data
  private readonly logger = new Logger(AltWhatsappService.name);

  constructor(@InjectModel('Instance') private InstanceModel: Model<Instance>) {
    this.initializeMongoConnection();
  }

  private async initializeMongoConnection() {
    try {
      if (mongoose.connection.readyState === 1) {
        this.logger.log('MongoDB connection already established');
      } else {
        mongoose.connection.once('open', () => {
          this.logger.log('MongoDB connection established');
        });

        mongoose.connection.on('error', (err) => {
          this.logger.error('MongoDB connection error:', err);
        });

        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(
            process.env.ENV === 'Local'
              ? 'mongodb://0.0.0.0:27017/DevWhatsTest'
              : process.env.DB_Prod_URL,
          );
        }
      }
    } catch (error) {
      this.logger.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to initialize MongoDB connection');
    }
  }

  async registerClient(body, res): Promise<void> {
    const { clientId } = body;
    if (!clientId) {
      return res.status(400).send('clientId is required');
    }

    try {
      await this.initializeMongoConnection();

      const findClient = await this.InstanceModel.findOne({
        clientId: clientId,
        isActive: true,
      });
      if (!findClient) {
        throw new BadRequestException('Client not found');
      }
      if (this.clients[clientId]) {
        return res.status(400).send(`Client ${clientId} already exists`);
      }

      const store = new MongoStore({ mongoose: mongoose });
      const sessionExists = await store.sessionExists({ session: clientId });

      if (!sessionExists) {
        this.logger.log(`Initializing new session for ${clientId}...`);
        const client = this.createClient(clientId, store, res);
        this.clients[clientId] = client;
        await client.initialize();
      } else {
        this.logger.log(`Reinitializing session for ${clientId}...`);
        const qrCodeData = await this.initializeClient(store, clientId);
        console.log(qrCodeData)
      }
      // return;

    } catch (error) {
      this.logger.error(`Error during client initialization: ${error.message}`);
      res.status(500).send('An error occurred during client initialization.');
    }
  }

  private createClient(clientId: string, store: typeof MongoStore, res: any) {
    const client = new Client({
      puppeteer: { headless: true },
      authStrategy: new RemoteAuth({
        clientId: clientId,
        store: store,
        backupSyncIntervalMs: 300000,
      }),
      webVersionCache: {
        type: 'remote',
        remotePath:
          'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
      },
    });

    client.on('qr', (qr) => {
      this.logger.log(`QR code received for ${clientId}`);
      qrcode.generate(qr, { small: true });
      this.qrCodeData[clientId] = qr;
    });

    client.on('ready', async () => {
      this.logger.log(`Client ${clientId} is ready`);
    });

    client.on('authenticated', () => {
      this.logger.log(`Client ${clientId} authenticated`);
    });

    client.on('message', async (message) => {
      try {
        if (message.from !== 'status@broadcast') {
          const contact = await message.getContact();
          this.logger.log(`Message from ${contact.number}: ${message.body}`);
        }
      } catch (error) {
        this.logger.error(`Error handling message: ${error.message}`);
      }
    });

    client.on('auth_failure', (msg) => {
      this.logger.error(`Authentication failure for ${clientId}: ${msg}`);
    });

    client.on('disconnected', (reason) => {
      this.logger.log(`Client ${clientId} was logged out: ${reason}`);
      delete this.clients[clientId];
    });

    return client;
  }

  private async initializeClient(
    store: typeof MongoStore,
    clientId: string,
  ): Promise<string> {
    const client = this.createClient(clientId, store, null);
    this.clients[clientId] = client;
    await client.initialize();
    return this.qrCodeData[clientId]; // Return QR code data
  }

  // send meesage to whatspp number
  async sendMessage(body, res) {
    const { clientId, number, message } = body;
    if (!clientId || !number || !message)
      throw new BadRequestException(
        'clientId, number, and message are required',
      );

    const client = this.clients[clientId];
    console.log(client)
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      await client.sendMessage(number, message);
      return res.send({ message: 'message sent succesfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending message: ${error}`);
    }
  }

  // create api for sending mediaifile to whatsapp number
  async sendMedia(body, res) {
    const { clientId, number, mediaUrl, caption } = body;
    if (!clientId || !number || !mediaUrl)
      throw new BadRequestException(
        'clientId, number, and mediaUrl are required',
      );

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      const media = await MessageMedia.fromUrl(mediaUrl);
      await client.sendMessage(number, media, { caption: caption });
      return res.send({ message: 'media sent successfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending media: ${error}`);
    }
  }

  async sendMessageReply(body, res) {
    const { clientId, number, message, messageId } = body;
    if (!clientId || !number || !message || !messageId)
      throw new BadRequestException(
        'clientId, number, message, and messageId are required',
      );

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      await client.sendMessage(number, message, {
        quotedMessageId: messageId,
      });
      return res.send({ message: 'message sent succesfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending message: ${error}`);
    }
  }

  async sendSeen(body, res) {
    const { clientId, number } = body;
    if (!clientId || !number)
      throw new BadRequestException('clientId and number are required');

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      await client.sendSeen(number);
      return res.send({ message: 'seen sent successfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending seen: ${error}`);
    }
  }

  async sendLocation(body, res) {
    const { clientId, number, lat, long, title, address } = body;
    if (!clientId || !number || !lat || !long || !title || !address)
      throw new BadRequestException(
        'clientId, number, lat, long, title, and address are required',
      );

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      // await client.sendLocation(number, lat, long, title, address);
      return res.send({ message: 'location sent successfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending location: ${error}`);
    }
  }

  async sendContactCards(body, res) {
    const { clientId, number, contacts } = body;
    if (!clientId || !number || !contacts)
      throw new BadRequestException(
        'clientId, number, and contacts are required',
      );

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      // await client.sendContactCards(number, contacts);
      return res.send({ message: 'contact cards sent successfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending contact cards: ${error}`);
    }
  }

  async sendContact(body, res) {
    const { clientId, number, contact } = body;
    if (!clientId || !number || !contact)
      throw new BadRequestException(
        'clientId, number, and contact are required',
      );

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      // await client.sendContact(number, contact);
      return res.send({ message: 'contact sent successfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending contact: ${error}`);
    }
  }

  async sendPoll(body, res) {
    const { clientId, number, question, options } = body;
    if (!clientId || !number || !question || !options)
      throw new BadRequestException(
        'clientId, number, question, and options are required',
      );

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      // await client.sendPoll(number, question, options);
      // await client.(number, question, options);
      return res.send({ message: 'poll sent successfully' });
    } catch (error) {
      throw new BadRequestException(`Error sending poll: ${error}`);
    }
  }

  async validateNumber(body, res) {
    const { clientId, number } = body;
    if (!clientId || !number)
      throw new BadRequestException('clientId and number are required');

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      const isValid = await client.isRegisteredUser(number);
      return res.send({ isValid });
    } catch (error) {
      throw new BadRequestException(`Error validating number: ${error}`);
    }
  }

  async getContactInfo(body, res) {
    const { clientId, number } = body;
    if (!clientId || !number)
      throw new BadRequestException('clientId and number are required');

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    try {
      // const contact = await client.getContactInfo(number);
      // return res.send({ contact });
    } catch (error) {
      throw new BadRequestException(`Error getting contact info: ${error}`);
    }
  }

  // send button group to whatsapp number
  async sendButtonGroup(body, res) {
    const { clientId, number, buttons, text } = body;
    if (!clientId || !number || !text)
      throw new BadRequestException(
        'clientId, number, buttons, and text are required',
      );

    const client = this.clients[clientId];
    if (!client) {
      throw new BadRequestException(`Client ${clientId} does not exist`);
    }
    const button1 = new Buttons(
      text,
      [{ body: 'Button1' }, { body: 'Button2' }],
      'Title',
      'Footer',
    );

    try {
      await client.sendMessage(number, button1);
      res.status(200).json({ message: 'Button message sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to send button message',
        error: error.message,
      });
    }
  }

  async getQrCode(clientId, res) {
    if (!clientId) {
      throw new BadRequestException('clientId is required');
    }

    const qrCodeData = this.qrCodeData[clientId];
    if (!qrCodeData) {
      throw new BadRequestException(`QR code data for ${clientId} not found`);
    }
    res.status(200).send({ code: qrCodeData });
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateAltWhatsappDto } from './dto/create-alt-whatsapp.dto';
import { UpdateAltWhatsappDto } from './dto/update-alt-whatsapp.dto';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class AltWhatsappService {
  private clients: { [key: string]: Client } = {};
  private readonly logger = new Logger(AltWhatsappService.name);

  async createClient(clientId: string): Promise<void> {
    if (this.clients[clientId]) {
      this.logger.log(`Client ${clientId} already exists`);
      return;
    }

    const client = new Client({
      puppeteer: { headless: true },
      authStrategy: new LocalAuth({ clientId }),
    });

    client.on('qr', (qr) => {
      this.logger.log(`QR RECEIVED for ${clientId}`);
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', async () => {
      this.logger.log(`Client ${clientId} is ready!`);
      const version = await client.getWWebVersion();
      this.logger.log(`WhatsApp Web Version: ${version}`);
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

    this.clients[clientId] = client;
    await client.initialize();
  }




  create(createAltWhatsappDto: CreateAltWhatsappDto) {
    return 'This action adds a new altWhatsapp';
  }

  findAll() {
    return `This action returns all altWhatsapp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} altWhatsapp`;
  }

  update(id: number, updateAltWhatsappDto: UpdateAltWhatsappDto) {
    return `This action updates a #${id} altWhatsapp`;
  }

  remove(id: number) {
    return `This action removes a #${id} altWhatsapp`;
  }
}

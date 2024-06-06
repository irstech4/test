import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AltWhatsappService } from './alt-whatsapp.service';
import { CreateAltWhatsappDto } from './dto/create-alt-whatsapp.dto';
import { UpdateAltWhatsappDto } from './dto/update-alt-whatsapp.dto';

@Controller('alt-whatsapp')
export class AltWhatsappController {
  constructor(private readonly altWhatsappService: AltWhatsappService) {}


  @Post('register')
  async registerClient(@Body('clientId') clientId: string) {
    await this.altWhatsappService.createClient(clientId);
    return { message: `Client ${clientId} registered successfully` };
  }
  
  @Post()
  create(@Body() createAltWhatsappDto: CreateAltWhatsappDto) {
    return this.altWhatsappService.create(createAltWhatsappDto);
  }

  @Get()
  findAll() {
    return this.altWhatsappService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.altWhatsappService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAltWhatsappDto: UpdateAltWhatsappDto) {
    return this.altWhatsappService.update(+id, updateAltWhatsappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.altWhatsappService.remove(+id);
  }
}

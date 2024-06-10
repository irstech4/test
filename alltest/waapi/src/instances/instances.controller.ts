import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InstancesService } from './instances.service';
import { AdminAuthGuard } from 'src/auth/gaurds/adminAuth.gaurd';

@Controller('instances')
export class InstancesController {
  constructor(private readonly instancesService: InstancesService) {}

  
  @Post("/createClientId")
  @UseGuards(AdminAuthGuard)
  createClientId(@Body() body:any, @Res() res:Response){
    return this.instancesService.createClientId(body,res);
  }
}

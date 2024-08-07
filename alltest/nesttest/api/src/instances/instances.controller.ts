import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InstancesService } from './instances.service';
import { AdminAuthGuard } from 'src/auth/gaurds/adminAuth.gaurd';

@Controller('instances')
export class InstancesController {
  constructor(private readonly instancesService: InstancesService) {}

  @UseGuards(AdminAuthGuard)
  @Post("/createClientId")
  createClientId(@Body() body:any, @Res() res:Response){
    return this.instancesService.createClientId(body);
  }

  @Post("/generateToken")
  generateToken(@Body() body:any, @Res() res:Response){
    return this.instancesService.generateToken(body,res);
  }

  @Get("/getAllClientIds/:id")
  getAllClientIds(@Res() res:Response,@Param('id') id:any){
    return this.instancesService.getAllClientIds(res,id);
  }

  @Get("/findClientById/:id")
  findClientById(@Res() res:Response,@Param('id') id:any){
    return this.instancesService.findClientById(res,id);
  }
}
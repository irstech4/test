import { Body, Controller, Param, Post, Query, Res } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { query } from 'express';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly PaymentsService: PaymentsService) {}

  @Post('/create-order')
  async createOrder(@Body() body: any,@Res() res:Response) {
    return this.PaymentsService.createOrder(body,res);
  }

  @Post('/payment-verification')
  async verifyPayment(@Body() body: any,@Res() res:Response,@Query() query:any){
    return this.PaymentsService.verifyPayment(body,res,query);
  }

  @Post('/createOrder')
  async createCashfreeOrder(@Body() body: any,@Res() res:Response) {
    return this.PaymentsService.createCashfreeOrder(body,res);
  }
  @Post('/verifyPayment')
  async verifyCashFreePayment(@Body() body: any,@Res() res:Response) {
    return this.PaymentsService.verifyCashFreePayment(body,res);
  }
}

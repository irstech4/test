import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Razorpay from 'razorpay';
import { Payment } from './schema/payment.schema';
import { Model } from 'mongoose';
import { Plans } from 'src/plan/schema/plan.schema';
import crypto from 'crypto';
import { InstancesService } from 'src/instances/instances.service';
import { Cashfree } from 'cashfree-pg';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentsService {
  private razorpayInstance: Razorpay;
  private cashfreeInstance: any;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Plans.name) private planModel: Model<Plans>,
    private readonly instaceService: InstancesService,
    private readonly httpService: HttpService,
  ) {
    this.razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRETKEY,
    });

    Cashfree.XClientId = process.env.CASHFREE_APPID;
    Cashfree.XClientSecret = process.env.CASHFREE_SECRETKEY;
    Cashfree.XEnvironment =
      process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION'
        ? Cashfree.Environment.PRODUCTION
        : Cashfree.Environment.SANDBOX;
  }

  // for razor pay
  async createOrder(body: any, res: any) {
    if (!body.planId) {
      throw new BadRequestException('Plan Id is required');
    }

    try {
      const plan = await this.planModel
        .findOne({ planId: body.planId })
        .select('planAmount instanceCount');
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }
      const options = {
        amount: plan.planAmount * plan.instanceCount * 100,
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
        payment_capture: 1,
      };
      const createOrder = await this.razorpayInstance.orders.create(options);

      res.status(201).send({
        data: createOrder,
        message: 'Order created successfully',
        status: true,
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new InternalServerErrorException(
        'An error occurred while creating the order',
      );
    }
  }

  async verifyPayment(body: any, res, query: any) {
    const { userId, amount, currency, planId } = query;
    const mainamount = +amount / 100 + currency;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    const mixture = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRETKEY)
      .update(mixture.toString())
      .digest('hex');

    try {
      const plan = await this.planModel
        .findOne({ planId: planId })
        .select('discountedAmount instanceCount ');
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }
      if (expectedSignature !== razorpay_signature) {
        await this.paymentModel.create({
          userId: userId,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          transactionSignature: expectedSignature,
          transactionStatus: 'failed',
          transactionAmount: mainamount,
        });
        throw new BadRequestException('Invalid signature');
      }
      const savePaymentHistory = await this.paymentModel.create({
        userId: userId,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        transactionSignature: expectedSignature,
        transactionAmount: mainamount,
        transactionStatus: 'success',
      });
      this.instaceService.createClientId({ userId, planId });
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('An error occurred while verifying payment');
    }
  }

  async createCashfreeOrder(body, res) {
    const uniqueOrder = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHmac('sha256', process.env.CASHFREE_SECRETKEY);
    hash.update(uniqueOrder);
    const orderId = hash.digest('hex').substr(0, 20);
    if (!body.planId) {
      throw new BadRequestException('Plan Id is required');
    }
    try {
      const plan = await this.planModel
        .findOne({ planId: body.planId })
        .select('planAmount discountedAmount');
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }

      let request: any = {
        order_amount: plan.planAmount,
        order_currency: 'INR',
        customer_details: {
          customer_id: 'node_sdk_test',
          customer_name: '',
          customer_email: 'example@gmail.com',
          customer_phone: '9999999999',
        },
        // "order_meta": {
        //   "return_url": "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123"
        // },
        order_note: '',
      };
      const response = await Cashfree.PGCreateOrder('2023-08-01', request);

      res
        .status(200)
        .send({ message: 'Order created successfully', data: response.data });
    } catch (error) {
      console.error('Error creating Cashfree order:', error);
      throw new InternalServerErrorException(
        'An error occurred while creating the order',
      );
    }
  }

  async verifyCashFreePayment(body, res) {
    const { orderId ,userId,planId} = body;
    if (!orderId) throw new BadRequestException('Order Id is required');
    const url =
      process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION'
        ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
        : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`;

    const apiUrl = url;
    const headers = {
      accept: 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.CASHFREE_APPID,
      'x-client-secret':
        process.env.CASHFREE_SECRETKEY,
    };
    try {
      const respond: any = await this.httpService
        .get(apiUrl, { headers })
        .toPromise();

      const paymentId = respond.data[0].cf_payment_id;
      const order_amount = respond.data[0].order_amount;
      const status = respond.data[0].payment_status;
      const response = await Cashfree.PGOrderFetchPayment(
        '2023-08-01',
        orderId,
        paymentId,
      );
      const savePaymentHistory = await this.paymentModel.create({
        userId: userId,
        paymentId: paymentId,
        orderId: orderId,
        transactionSignature: "N/A",
        transactionAmount: order_amount,
        transactionStatus: status,
      });
      this.instaceService.createClientId({ userId, planId });
      res
        .status(200)
        .send({ message: 'Order verified successfully', data: response.data });
    } catch (error) {
      console.error('Error verifying Cashfree payment:', error);
      throw new InternalServerErrorException(
        'An error occurred while verifying the payment',
      );
    }
  }
}

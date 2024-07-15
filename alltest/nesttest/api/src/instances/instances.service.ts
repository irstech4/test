import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Instance } from './schema/instance.schema';
import { Model } from 'mongoose';
import { generateClientIds } from 'src/utils/common';
import { JwtService } from '@nestjs/jwt';
import { Plans } from 'src/plan/schema/plan.schema';
import { UserToken } from './schema/token.schema';
import { User } from 'src/auth/schema/auth.shcema';

@Injectable()
export class InstancesService {
  constructor(
    @InjectModel(Instance.name) private InstanceModel: Model<Instance>,
    @InjectModel(UserToken.name) private UserTokenModel: Model<UserToken>,
    @InjectModel(Plans.name) private PlanModel: Model<Plans>,
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createClientId(body) {
    try {
      const { userId, planId } = body;

      if (!userId || !planId) {
        throw new BadRequestException('UserId and PlanId are required');
      }

      const user = await this.UserModel.findOne({ userId }).select(
        '_id userId clientIds',
      );
      if (!user) throw new BadRequestException('User not found');
      const plan = await this.PlanModel.findOne({ planId }).select(
        'instanceCount',
      );

      if (!plan) {
        throw new BadRequestException('Plan not found');
      }

      const clientIds = generateClientIds(plan.instanceCount);
      const instances = clientIds.map((clientId) => ({
        userId: userId,
        clientId: clientId,
      }));
      console.log(instances);
      const insertedInstances = await this.InstanceModel.insertMany(instances);
      if (!insertedInstances) {
        throw new InternalServerErrorException(
          'An error occurred while creating ClientIds.',
        );
      }

      return({ message: 'ClientIds created successfully' });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while creating ClientIds.',
      );
    }
  }

  async generateToken(body, res) {
    try {
      const { userId } = body;

      if (!userId) {
        throw new Error('ClientId is required');
      }

      const user = await this.UserModel.findOne({ userId }).select(
        '_id userId',
      );

      if (!User) {
        throw new Error('Instance not found');
      }

      const token = this.jwtService.sign({ userId: user.userId });
      // console.log(token);
      const createToken = await this.UserTokenModel.create({
        userId: user.userId,
        token: token,
      });
      user.token = createToken._id;
      await user.save();

      res
        .status(200)
        .json({ status: 'success', message: 'Token generated successfully' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllClientIds(res,id){
    try{
      
      const clientIds = await this.InstanceModel.find({userId:id}).sort({createdAt:-1})
      res.status(200).send({message:"ClientIds fetched successfully",data:clientIds})
    }catch(error){
      throw new InternalServerErrorException('An error occurred while fetching ClientIds.');
    }
  }

  async findClientById(res,id){
    try{
      const client = await this.InstanceModel.findOne({clientId:id})
      res.status(200).send({message:"Client fetched successfully",data:client})
    }catch(error){
      throw new InternalServerErrorException('An error occurred while fetching Client.');
    }
  }
}

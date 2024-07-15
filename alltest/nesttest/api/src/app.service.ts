import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello Frontend! Welcome to the Meseji API!';
    }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFunctionsService {
  generateUniqueIntegerId(): number {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000);
    return parseInt(`${timestamp}${randomPart}`);
  }
}

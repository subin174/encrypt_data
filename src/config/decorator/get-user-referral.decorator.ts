import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const GetReferral = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
      const req: Request = context.switchToHttp().getRequest();
      const user = req['user'];
      console.log('GetReferral user >>>>> ', user);
      return Number(user?.referralId);
  },
);

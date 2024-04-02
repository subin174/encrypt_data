import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const GetIP = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    return req.headers['cf-connecting-ip'] || 
      req.headers['x-original-forwarded-for'] || 
      req.headers['x-forwarded-for'] || 
      req.ip;
  },
);

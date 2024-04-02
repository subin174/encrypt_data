import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {Request} from "express";
import { UserDto } from '../../dto/user.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('error.user.login');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.ACCOUNT_SECRET,
            });
            // payload.token = token;
            request['user'] = new UserDto(payload,token);
        } catch(error) {
            // console.log('token error',error.message,request.url);
            throw new UnauthorizedException('error.user.login');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        try{
            const [type, token] = request.headers?.authorization?.split(' ') ?? [];
            return type === 'Bearer' ? token : undefined;
        }catch(erorr){
            throw new UnauthorizedException('error.user.login');
        }
    }
}

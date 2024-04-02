import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "vC6n030hglrznH8cWnZRUdlFfoQPzBVv7dte4oCL8LH7imkttCX6BbPPq8NvmQMEYqBg5MU5IiiigmSh57ykCJVr3wjgSW7oyoMYt2idsaq7aM9uWWKkz8lLilVHJqZm",
    });
  }
}

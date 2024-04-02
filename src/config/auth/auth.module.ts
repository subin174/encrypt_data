import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'vC6n030hglrznH8cWnZRUdlFfoQPzBVv7dte4oCL8LH7imkttCX6BbPPq8NvmQMEYqBg5MU5IiiigmSh57ykCJVr3wjgSW7oyoMYt2idsaq7aM9uWWKkz8lLilVHJqZm',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}

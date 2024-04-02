import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppConfiguration, appConfiguration } from './config/configuration';
import { ResponseInterceptor } from './config/interceptors/response.interceptor';
import { HttpExceptionFilter } from './config/interceptors/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  app.enableShutdownHooks();
  configureValidation(app);
  configureSwagger(app);
  app.enableCors();

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(appConfig.port);
}

const configureSwagger = (app: INestApplication) => {
  const SWAGGER_PATH = '/docs';


  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('encrypt')
    .setDescription('encrypt by Bin')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup(SWAGGER_PATH, app, swaggerDoc);
};

const configureValidation = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
};
bootstrap();

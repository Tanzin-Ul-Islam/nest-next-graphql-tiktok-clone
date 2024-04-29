import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { BadRequestException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: '*',
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Authorization',
      'X-Requested-with',
      'apollo-require-preflight',
    ]
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formatedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', '
          )
          return accumulator;
        }, {})
        throw new BadRequestException(formatedErrors);
      }
    })
  )
  await app.listen(3000);
}
bootstrap();

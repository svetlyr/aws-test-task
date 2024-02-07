import { NestFactory } from '@nestjs/core';

import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

let server: Handler;

async function bootstrapServerless() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

async function bootstrap() {
  if (process.env.AWS_EXECUTION_ENV) {
    return; // No need to bootstrap for AWS Lambda
  }

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('AWS-TEST-TASK API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('API')
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrapServerless());
  return server(event, context, callback);
};

bootstrap();

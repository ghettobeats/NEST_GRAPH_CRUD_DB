import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
app.useGlobalPipes(
new ValidationPipe({
whitelist: true,
//forbidNonWhitelisted: true, //Esto es solo para las rest api evita que se envien informacion adicional graph no lo necesita 
})
)
  await app.listen(3000);
}
bootstrap();

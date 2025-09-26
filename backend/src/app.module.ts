/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ChatModule } from './chat/chat.module';

// @Module({
//   imports: [ChatModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { Message } from './chat/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'chat.db',
      entities: [Message],
      synchronize: true, // auto-create tables (only for dev)
    }),
    ChatModule,
  ],
})
export class AppModule {}

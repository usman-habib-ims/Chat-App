/* eslint-disable prettier/prettier */
// import { Controller } from '@nestjs/common';

// @Controller('chat')
// export class ChatController {}


import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  getMessages(): Promise<Message[]> {
    return this.chatService.getAllMessages();
  }
}

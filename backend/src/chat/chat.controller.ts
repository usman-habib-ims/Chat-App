/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
// import { Message } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  getMessages() {
    return this.chatService.getAllMessages();
  }
}

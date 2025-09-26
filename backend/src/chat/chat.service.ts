/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ChatService {}


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async saveMessage(sender: string, content: string): Promise<Message> {
    const msg = this.messageRepository.create({ sender, content });
    return this.messageRepository.save(msg);
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find({ order: { createdAt: 'ASC' } });
  }
}

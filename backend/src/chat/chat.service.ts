/* eslint-disable prettier/prettier */
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

  async saveMessage(sender: string, content: string){
    const msg = this.messageRepository.create({ sender, content });
    return this.messageRepository.save(msg);
  }

  async getAllMessages() {
    return this.messageRepository.find({ order: { createdAt: 'ASC' } });
  }
}

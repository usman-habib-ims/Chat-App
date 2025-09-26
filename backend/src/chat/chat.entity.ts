/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("chat")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}

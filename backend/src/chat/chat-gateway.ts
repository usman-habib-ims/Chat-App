/* eslint-disable prettier/prettier */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log('New user connected...', client.id);

    client.broadcast.emit('user-joined', {
      message: `New User joined the chat: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected...', client.id);

    this.server.emit('user-left', {
      message: `User left the chat: ${client.id}`,
    });
  }

  @SubscribeMessage('newMessage')
  async handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sender: string; content: string },
  ) {

    console.log('Received:', data);

    // Save to DB
    const msg = await this.chatService.saveMessage(data.sender, data.content);

    // Broadcast to all clients
    this.server.emit('reply', msg);
  }
}

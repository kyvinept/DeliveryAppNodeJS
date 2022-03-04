import {Server as SocketIOServer} from 'socket.io';
import {Server} from 'http';

export interface SocketUser {
  socketId: string;
  userId: number;
}

export class SocketServer {
  users: SocketUser[];

  constructor(httpServer: Server) {
    const io = new SocketIOServer(httpServer);

    io.of('/api/sockets').on('connection', (socket) => {
      console.log('socket is ready for connection', socket.data);
      socket.on('identify', (userId) => {
        this.users.push({
          socketId: socket.id,
          userId: userId,
        });
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
        this.users = this.users.filter((user) => user.socketId !== socket.id);
      });
    });
  }
}

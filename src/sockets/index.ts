import {Server as SocketIOServer, Socket} from 'socket.io';
import {Server} from 'http';
import {OnEventType} from './EventType';
import {ChatSocketServer} from './chatSocketServer';
import {container, injectable} from 'tsyringe';
import {SocketAuthMiddleware} from 'middleware';

enum RouteType {
  sockets = '/api/sockets',
}

@injectable()
export class SocketServer {
  private timer = null;

  configure = (httpServer: Server) => {
    const io = new SocketIOServer(httpServer);
    io.of(RouteType.sockets)
      .use(SocketAuthMiddleware)
      .on(OnEventType.connection, this.onConnection);
  };

  private onConnection = (socket: Socket) => {
    const chatSocketServerInstance = container.resolve(ChatSocketServer);
    chatSocketServerInstance.configure(socket);

    this.setTimer(socket);

    socket.on(OnEventType.disconnect, this.onDisconnect);
  };

  private onDisconnect = () => {
    console.log('disconnect');
    clearTimeout(this.timer);
  };

  private setTimer = (socket: Socket) => {
    const expiresIn = (socket.data.user.exp - Date.now() / 1000) * 1000;
    console.log(expiresIn / 1000 / 60);
    this.timer = setTimeout(() => socket.disconnect(true), expiresIn);
  };
}

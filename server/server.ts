import { Namespace, Server } from 'socket.io';

import * as http from 'http';
import {Config}  from "./config/config";
import Logger    from "./logger";


interface NamedParam {
  config: Config;
}

export class ETDServer {
  config: Config;
  nodeRoomName: string;
  nodeServer: Namespace | undefined;
  clientServer: Namespace | undefined;

  constructor({ config }: NamedParam) {
    this.config = config;
    this.nodeRoomName = 'node';
  }

  /**
   * Start a two socket io server
   * 1. Node Server: a server is listening to the nodes' info
   * 2. Client Server: send realtime server info and history to web ui
   * @param httpServer Http Server Object
   */
  async startServer(httpServer: http.Server) {
    /// Start socket io
    const io = new Server(httpServer, { cors: { origin: '*' } });
    io.on('connection', (data) => {
      Logger.info('Connected server');
      data.emit('hello world');
    });

    this.startClientServer(io);
    httpServer.listen(this.config.port, () => {
      Logger.info(`Socket IO Server is listening at port ${this.config.port}`);
    });
  }

  /**
   * Start client server
   * @param server
   */
  private startClientServer(server: Server): void {
    this.clientServer = server.of('/clients');
    this.clientServer.on('connection', (socket) => {
      Logger.info(`Connected client ${socket.id}`);

      socket.on('disconnect', () => {
        Logger.info(`Client ${socket.id} disconnected`);
      });

    });
  }

}

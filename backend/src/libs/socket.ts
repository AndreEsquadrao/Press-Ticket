import { Server as SocketIO } from "socket.io";
import { Server } from "http";
import AppError from "../errors/AppError";
import { logger } from "../utils/logger";

let io: SocketIO;

export const initIO = (httpServer: Server): SocketIO => {
  io = new SocketIO(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL
    }
  });

  io.on("connection", socket => {
    logger.info("Client Connected");
    socket.on("joinChatBox", (ticketId: string) => {
      logger.info("A client joined a ticket channel");
      socket.join(ticketId);
    });

    socket.on("joinNotification", () => {
      logger.info("A client joined notification channel");
      socket.join("notification");
    });

    socket.on("joinTickets", (status: string) => {
      logger.info(`A client joined to ${status} tickets channel.`);
      socket.join(status);
    });

    socket.on("disconnect", () => {
      logger.info("Client disconnected");
    });
    
    //controle de entrada e saida 
    socket.on("entrada", (valor: any) => {
      logger.info(valor.registro)
    });

    socket.on("saida", (valor: any) => {
      require('fs-extra').appendFile("./log/"+valor.data, valor.registro+"\n")
      require('fs-extra').readFile("./log/"+valor.data, function read(err: string, data: string){
        
        socket.emit("retorno", " "+data)
    })
    });

    socket.on("log", (valor: any) => {
      logger.info("Pedido de log - "+valor.data)
      require('fs-extra').readFile("./log/"+valor.data, function read(err: string, data: string){
        
        socket.emit("retorno", " "+data)
    })
    });

    socket.on("checkLog", (valor: string) => {
                logger.info("Checando diretorio de log");
                require('fs-extra').ensureDir("./log", () => {
                    
                    logger.info("Diretorio de log OK");
                });
                logger.info("Checando arquivo de log");
                require('fs-extra').ensureFile("./log/"+valor, () => {
                    
                    logger.info("Arquivo de log OK");
                });
                
    });
  });
  return io;
};

export const getIO = (): SocketIO => {
  if (!io) {
    throw new AppError("Socket IO not initialized");
  }
  return io;
};

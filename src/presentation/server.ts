import { FastifyPluginAsync, fastify } from "fastify";
import cors from "@fastify/cors";

interface Options {
  port?: number;
  routes: FastifyPluginAsync;
}

export class Server {
  private readonly app = fastify({ logger: true });
  private readonly port: number;
  private readonly routes: FastifyPluginAsync;

  constructor({ port = 3000, routes }: Options) {
    this.port = port;
    this.routes = routes;
  }

  start() {
    this.app.register(this.routes, { prefix: "/api" });
    this.app.register(cors, {
      origin: "http://localhost:4200",
      methods: ["GET", "PUT", "POST", "DELETE"],
    });
    this.app.listen({ port: this.port }, (err, address) => {
      if (err) {
        this.app.log.error(err);
        process.exit(1);
      }
      console.log(`Server running in port http://localhost:${this.port}`);
    });
  }
}

import { FastifyPluginAsync, FastifyPluginCallback, fastify } from "fastify";

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
    this.app.listen({ port: this.port }, (err, address) => {
      if (err) {
        this.app.log.error(err);
        process.exit(1);
      }
      console.log(`Server running in port http://localhost:${this.port}`);
    });
  }
}

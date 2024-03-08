import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ProductRouter from "./product/routes";

export class AppRoutes {
  static async routes(server: FastifyInstance, options: FastifyPluginOptions) {
    server.get("/", (req, reply) => {
      return {
        message: "Hello from AppRoutes",
      };
    });
    server.register(ProductRouter.routes, { prefix: "/products" });
  }
}

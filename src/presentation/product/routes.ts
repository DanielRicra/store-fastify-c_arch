import { FastifyInstance, FastifyPluginOptions } from "fastify";

import { ProductController } from "./controller";
import { ProductDatasourceImpl } from "../../infrastructure/datasources";
import { ProductRepositoryImpl } from "../../infrastructure/repositories";

class ProductRouter {
  static async routes(server: FastifyInstance, options: FastifyPluginOptions) {
    const datasource = new ProductDatasourceImpl();
    const repository = new ProductRepositoryImpl(datasource);

    const controller = new ProductController(repository);

    server.get("/", controller.getProducts);
    server.post("/", controller.addProduct);
    server.put("/:id", controller.updateProduct);
    server.delete("/:id", controller.deleteProduct);
  }
}

export default ProductRouter;

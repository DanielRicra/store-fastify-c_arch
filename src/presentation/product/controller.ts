import { FastifyReply, RouteHandlerMethod } from "fastify";

import { CustomError } from "../../domain/errors";
import { ProductRepository } from "../../domain/repositories";
import {
  AddProduct,
  DeleteProduct,
  GetProduct,
  GetProducts,
  UpdateProduct,
} from "../../domain/use-cases/product";
import { ProductDTO, UpdateProductDTO } from "../../domain/dtos/product";

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  private handleError = (error: unknown, reply: FastifyReply) => {
    if (error instanceof CustomError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }

    return reply.code(500).send({ error: "Internal server Error" });
  };

  getProducts: RouteHandlerMethod = (req, reply) => {
    new GetProducts(this.productRepository)
      .execute()
      .then((data) => reply.send(data))
      .catch((err) => this.handleError(err, reply));
  };

  getProduct: RouteHandlerMethod = (req, reply) => {
    const { id } = req.params as { id: number };

    new GetProduct(this.productRepository)
      .execute(id)
      .then((data) => reply.send(data))
      .catch((err) => this.handleError(err, reply));
  };

  updateProduct: RouteHandlerMethod = (req, reply) => {
    const { id } = req.params as { id: number };

    const [error, updateProductDTO] = UpdateProductDTO.create(
      req.body as Object
    );

    if (error || !updateProductDTO) {
      reply.code(400).send({ error });
      return;
    }

    new UpdateProduct(this.productRepository)
      .execute(id, updateProductDTO)
      .then((data) => reply.send(data))
      .catch((err) => this.handleError(err, reply));
  };

  addProduct: RouteHandlerMethod = (req, reply) => {
    const [error, productDTO] = ProductDTO.create(req.body as Object);

    if (error || !productDTO) {
      reply.code(400).send({ error });
      return;
    }

    new AddProduct(this.productRepository)
      .execute(productDTO)
      .then((data) => reply.send(data))
      .catch((err) => this.handleError(err, reply));
  };

  deleteProduct: RouteHandlerMethod = (req, reply) => {
    const { id } = req.params as { id: number };
    new DeleteProduct(this.productRepository)
      .execute(id)
      .then((data) => reply.code(204).send(data))
      .catch((err) => this.handleError(err, reply));
  };
}

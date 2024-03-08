import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

interface GetProductsUseCase {
  execute(): Promise<ProductEntity[]>;
}

export class GetProducts implements GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  execute = async (): Promise<ProductEntity[]> => {
    return await this.productRepository.getProducts();
  };
}

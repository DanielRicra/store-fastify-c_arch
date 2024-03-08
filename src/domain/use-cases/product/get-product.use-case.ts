import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

interface GetProductUseCase {
  execute(id: number): Promise<ProductEntity>;
}

export class GetProduct implements GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  execute = async (id: number): Promise<ProductEntity> => {
    return await this.productRepository.getProduct(id);
  };
}

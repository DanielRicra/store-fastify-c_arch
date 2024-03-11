import { PaginationDTO } from "../../dtos";
import { ProductListEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

interface GetProductsUseCase {
  execute(options: PaginationDTO): Promise<ProductListEntity>;
}

export class GetProducts implements GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  execute = async (options: PaginationDTO): Promise<ProductListEntity> => {
    return await this.productRepository.getProducts(options);
  };
}

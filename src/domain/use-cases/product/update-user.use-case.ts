import { UpdateProductDTO } from "../../dtos/product";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

interface UpdateProductUseCase {
  execute(
    id: number,
    updateProductDTO: UpdateProductDTO
  ): Promise<ProductEntity>;
}

export class UpdateProduct implements UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  execute = async (
    id: number,
    updateProductDTO: UpdateProductDTO
  ): Promise<ProductEntity> => {
    return await this.productRepository.updateProduct(id, updateProductDTO);
  };
}

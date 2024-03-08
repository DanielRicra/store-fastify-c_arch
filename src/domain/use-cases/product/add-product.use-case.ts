import { ProductDTO } from "../../dtos/product";
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

interface AddProductUseCase {
  execute(productDTO: ProductDTO): Promise<ProductEntity>;
}

export class AddProduct implements AddProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  execute = async (productDTO: ProductDTO): Promise<ProductEntity> => {
    return await this.productRepository.addProduct(productDTO);
  };
}

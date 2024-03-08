import { ProductRepository } from "../../repositories";

interface DeleteProductUseCase {
  execute(id: number): Promise<void>;
}

export class DeleteProduct implements DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  execute = async (id: number): Promise<void> => {
    await this.productRepository.deleteProduct(id);
  };
}

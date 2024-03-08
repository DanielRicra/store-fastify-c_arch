import { ProductDTO, UpdateProductDTO } from "../dtos/product";
import { ProductEntity } from "../entities";

export abstract class ProductRepository {
  abstract getProducts(): Promise<ProductEntity[]>;
  abstract getProduct(id: number): Promise<ProductEntity>;
  abstract updateProduct(
    id: number,
    updateProductDTO: UpdateProductDTO
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: number): Promise<void>;
  abstract addProduct(productDto: ProductDTO): Promise<ProductEntity>;
}

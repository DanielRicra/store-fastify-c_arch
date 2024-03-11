import { PaginationDTO } from "../dtos";
import { ProductDTO, UpdateProductDTO } from "../dtos/product";
import { ProductEntity, ProductListEntity } from "../entities";

export abstract class ProductRepository {
  abstract getProducts(options: PaginationDTO): Promise<ProductListEntity>;
  abstract getProduct(id: number): Promise<ProductEntity>;
  abstract updateProduct(
    id: number,
    updateProductDTO: UpdateProductDTO
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: number): Promise<void>;
  abstract addProduct(productDto: ProductDTO): Promise<ProductEntity>;
}

import { ProductDatasource } from "../../domain/datasources";
import { UpdateProductDTO, ProductDTO } from "../../domain/dtos/product";
import { ProductEntity } from "../../domain/entities";
import { ProductRepository } from "../../domain/repositories";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDatasource: ProductDatasource) {}

  getProducts(): Promise<ProductEntity[]> {
    return this.productDatasource.getProducts();
  }

  getProduct(id: number): Promise<ProductEntity> {
    return this.productDatasource.getProduct(id);
  }

  updateProduct(
    id: number,
    updateProductDTO: UpdateProductDTO
  ): Promise<ProductEntity> {
    return this.productDatasource.updateProduct(id, updateProductDTO);
  }

  deleteProduct(id: number): Promise<void> {
    return this.productDatasource.deleteProduct(id);
  }

  addProduct(productDto: ProductDTO): Promise<ProductEntity> {
    return this.productDatasource.addProduct(productDto);
  }
}

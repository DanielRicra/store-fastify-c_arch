import { ProductDatasource } from "../../domain/datasources";
import { ProductDTO, UpdateProductDTO } from "../../domain/dtos/product";
import { ProductEntity, ProductListEntity } from "../../domain/entities";
import { db } from "../../data/sqlite";
import { CustomError } from "../../domain/errors";
import { ProductMapper } from "../mappers";
import { PaginationDTO } from "../../domain/dtos";

export class ProductDatasourceImpl implements ProductDatasource {
  async getProducts({
    page,
    perPage,
  }: PaginationDTO): Promise<ProductListEntity> {
    try {
      const total = await new Promise<number>((resolve, reject) => {
        db.get(
          "SELECT COUNT(*) as count FROM products",
          (err, row: { count: number }) => {
            if (err) reject(err);

            resolve(row.count);
          }
        );
      });

      const products = await new Promise<Object[]>((resolve, reject) => {
        db.all(
          "SELECT * FROM products LIMIT ? OFFSET ?",
          [perPage, (page - 1) * perPage],
          (err, row) => {
            if (err) {
              reject(err);
            }
            resolve(row as Object[]);
          }
        );
      });
      
      if (products.length === 0) {
        throw CustomError.notFound("There is nothing here")
      }

      const items = products.map((product: Object) =>
        ProductMapper.productEntityFromObject(product)
      );

      const pages = Math.ceil(total / perPage);
      return new ProductListEntity(items, total, pages, perPage, page);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServerError();
    }
  }

  async getProduct(id: number): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

  async updateProduct(
    id: number,
    { imgUrl, name, price, rating }: UpdateProductDTO
  ): Promise<ProductEntity> {
    try {
      const updatedProduct = await new Promise<Object>((resolve, reject) => {
        db.run(
          "UPDATE products SET name=?,imgUrl=?,price=?,rating=?  WHERE id=?",
          [name, imgUrl, price, rating, id],
          function (err) {
            if (err) {
              reject(err);
            }
            if (this.changes === 0) {
              reject(CustomError.notFound("Product not found"));
            }
            resolve({ imgUrl, name, price, rating, id });
          }
        );
      });
      return ProductMapper.productEntityFromObject(updatedProduct);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServerError();
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      new Promise((resolve, reject) => {
        db.run("DELETE FROM products WHERE id=?", [id], function (err) {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      });
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServerError();
    }
  }

  async addProduct({
    imgUrl,
    name,
    price,
    rating,
  }: ProductDTO): Promise<ProductEntity> {
    try {
      const product = await new Promise<Object>((resolve, reject) => {
        db.run(
          "INSERT INTO products(imgUrl, name, price, rating) VALUES (?,?,?,?)",
          [imgUrl, name, price, rating],
          function (err: any) {
            if (err) {
              reject(err);
            }
            resolve({ id: this.lastID, name, imgUrl, price, rating });
          }
        );
      });

      return ProductMapper.productEntityFromObject(product);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServerError();
    }
  }
}

import { ProductEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

export class ProductMapper {
  static productEntityFromObject(object: { [key: string]: any }) {
    const { id, name, imgUrl, price, rating } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!imgUrl) throw CustomError.badRequest("Missing imgUrl");
    if (!price) throw CustomError.badRequest("Missing price");
    if (!rating) throw CustomError.badRequest("Missing rating");

    return new ProductEntity(id, name, imgUrl, price, rating);
  }
}

export class UpdateProductDTO {
  private constructor(
    public name?: string,
    public imgUrl?: string,
    public price?: number,
    public rating?: number
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductDTO?] {
    const { name, imgUrl, price, rating } = object;

    if (name !== undefined && typeof name !== "string") {
      return ["name must be a string"];
    }

    if (imgUrl !== undefined && typeof imgUrl !== "string") {
      return ["imgUrl must be a string"];
    }

    if (price !== undefined && typeof price !== "number") {
      return ["number must be a number"];
    }

    if (rating !== undefined && typeof rating !== "number") {
      return ["rating must be a number"];
    }

    return [undefined, new UpdateProductDTO(name, imgUrl, price, rating)];
  }
}

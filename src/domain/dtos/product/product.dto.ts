export class ProductDTO {
  private constructor(
    public name: string,
    public imgUrl: string,
    public price: number,
    public rating: number
  ) {}

  static create(object: { [key: string]: any }): [string?, ProductDTO?] {
    const { name, imgUrl, price, rating } = object;

    if (!name) return ["Missing name"];
    if (!imgUrl) return ["Missing imgUrl"];
    if (!price) return ["Missing price"];
    if (!rating) return ["Missing rating"];
    if (typeof name !== "string") return ["name must be a string"];
    if (typeof imgUrl !== "string") return ["imgUrl must be a string"];
    if (typeof price !== "number") return ["number must be a number"];
    if (typeof rating !== "number") return ["rating must be a number"];

    return [undefined, new ProductDTO(name, imgUrl, price, rating)];
  }
}

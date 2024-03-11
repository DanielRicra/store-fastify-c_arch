import { ProductEntity } from "./product.entity";

export class ProductListEntity {
  constructor(
    public items: ProductEntity[],
    public total: number,
    public pages: number,
    public perPage: number = 5,
    public page: number = 1
  ) {}
}

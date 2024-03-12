export class ProductEntity {
  constructor(
    public id: number,
    public name: string,
    public imgUrl: string,
    public price: number,
    public rating: number
  ) {}
}

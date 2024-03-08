export class ProductEntity {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public price: number,
    public rating: number
  ) {}
}

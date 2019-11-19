export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public img?: string,
    public category?: string,
    public price?: number,
    public inCart?: boolean,
    public isDeleted: boolean = false
  ) {}
}

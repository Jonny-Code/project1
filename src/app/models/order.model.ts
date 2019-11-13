import { Injectable } from "@angular/core";

@Injectable()
export class Order {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public city: string,
    public state: string,
    public zip: string,
    public country: string,
    public shipped: boolean = false,
    public products: Object[]
  ) {}

  clear() {
    this.id = null;
    this.name = this.address = this.city = null;
    this.state = this.zip = this.country = null;
    this.shipped = false;
    localStorage.clear();
  }
}

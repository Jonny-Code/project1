import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { RestService } from "../services/rest.service";

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private rest: RestService) {
    rest.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  getProducts(category: string = null): Product[] {
    return this.products.filter(
      p => category == null || category == p.category
    );
  }

  getCategories(): string[] {
    return this.categories;
  }
}

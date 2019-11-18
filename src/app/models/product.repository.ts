import { Injectable, OnInit } from "@angular/core";
import { Product } from "./product.model";
import { RestService } from "../services/rest.service";

@Injectable()
export class ProductRepository implements OnInit {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private rest: RestService) {
    rest.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  ngOnInit() {
    this.rest.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  getProducts(category: string = null): Product[] {
    return this.products.filter(
      p => category == null || category == p.category
    );
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.rest.saveProduct(product).subscribe(p => this.products.push(p));
    }
  }

  deleteProduct(id: number) {
    this.rest.deleteProduct(id);
  }

  updateProduct(product: Product) {
    this.rest.updateProduct(product).subscribe(p => {
      this.products.splice(
        this.products.findIndex(p => p.id == product.id),
        1,
        product
      );
    });
  }

  getAllProducts(): Product[] {
    let temp;
    this.rest.getProducts().subscribe((data: any) => {
      temp = data;
    });
    return temp;
  }

  getCategories(): string[] {
    return this.categories;
  }
}

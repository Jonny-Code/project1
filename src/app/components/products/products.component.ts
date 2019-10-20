import { Component } from "@angular/core";
import { ProductRepository } from "../../models/product.repository";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  cartProducts: Product[];
  selectedCategory = null;
  productsPerPage = 3;
  constructor(private repo: ProductRepository) {}

  ngOnInit() {
    let items = { ...localStorage };
    let arr = [];
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        arr.push(JSON.parse(element));
      }
    }
    this.cartProducts = arr;
  }

  get products(): Product[] {
    return this.repo
      .getProducts(this.selectedCategory)
      .slice(0, this.productsPerPage);
  }

  get categories(): string[] {
    return this.repo.getCategories();
  }

  get cart(): Product[] {
    return this.cartProducts;
  }

  changePageSize = (newSize: number) => {
    this.productsPerPage = Number(newSize);
  };

  changeCategory = (newCategory?: string) => {
    if (newCategory == "null") {
      this.selectedCategory = null;
    } else this.selectedCategory = newCategory;
  };

  addToCart = (e: number) => {
    let [prod] = this.repo.getProducts().filter(i => i.id == e);
    if (localStorage.getItem(`${prod.id}`) == null) {
      localStorage.setItem(`${prod.id}`, JSON.stringify(prod));
    } else return;
    this.ngOnInit();
  };
  openCart = () => {
    let items = { ...localStorage };
    let arr = [];
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        arr.push(JSON.parse(element));
      }
    }
    this.cartProducts = arr;
  };
  removeCartItem = (e: number) => {
    console.log(e);
    localStorage.removeItem(`${e}`);
    this.ngOnInit();
  };
}

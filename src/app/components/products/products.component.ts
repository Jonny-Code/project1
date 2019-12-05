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
  cartProdsPerPage = localStorage.length;
  productsLength: number;
  hasAccount: boolean;
  name: string;
  company: string;
  location: string;
  email: string;
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
    this.cartProdsPerPage = arr.length;

    if (sessionStorage.length > 0) {
      this.hasAccount = true;
      this.name = JSON.parse(sessionStorage.getItem("account")).name;
      this.company = JSON.parse(sessionStorage.getItem("account")).company;
      this.location = JSON.parse(sessionStorage.getItem("account")).location;
      this.email = JSON.parse(sessionStorage.getItem("account")).email;
    } else this.hasAccount = false;
  }

  get products(): Product[] {
    this.productsLength = this.repo.getProducts().length;
    return this.repo
      .getProducts(this.selectedCategory)
      .slice(0, this.productsPerPage);
  }
  get categories(): string[] {
    return this.repo.getCategories();
  }

  get cart(): Product[] {
    return this.cartProducts.slice(0, this.cartProdsPerPage);
  }

  getSelectOptions = (): Array<any> => {
    return new Array(localStorage.length);
  };

  changePageSize = (newSize: number) => {
    this.productsPerPage = Number(newSize);
  };

  changeCartSize = (newSize: number) => {
    this.cartProdsPerPage = newSize;
  };

  changeCategory = (newCategory?: string) => {
    if (newCategory == "null") {
      this.selectedCategory = null;
    } else this.selectedCategory = newCategory;
  };

  addToCart = (e: number) => {
    let [prod] = this.repo.getProducts().filter(i => i.id == e);
    prod.inCart = true;
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
    localStorage.removeItem(`${e}`);
    this.products.forEach(prod => {
      if (e == prod.id) prod.inCart = false;
    });
    this.ngOnInit();
  };
}

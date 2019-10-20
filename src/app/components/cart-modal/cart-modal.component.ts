import { Component } from "@angular/core";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-cart-modal",
  templateUrl: "./cart-modal.component.html",
  styleUrls: ["./cart-modal.component.css"]
})
export class CartModalComponent {
  products: Product[];

  constructor() {}

  ngOnInit() {
    console.log("opened");
    let arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      const element = JSON.parse(localStorage.getItem(`${i + 1}`));
      arr.push(element);
    }
    this.products = arr;
  }

  get cart(): Product[] {
    return this.products;
  }
}

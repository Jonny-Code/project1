import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  cartProducts: Product[];

  constructor() {}

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

  get cart(): Product[] {
    return this.cartProducts;
  }

  removeCartItem = (e: number) => {
    console.log(e);
    localStorage.removeItem(`${e}`);
    this.ngOnInit();
  };
}

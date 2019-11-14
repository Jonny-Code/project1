import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductRepository } from "../../models/product.repository";
import { Product } from "../../models/product.model";
import { OrderRepository } from "../../models/order.repository";
import { Order } from "../../models/order.model";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  cartProducts: Product[];
  cartProdsPerPage = localStorage.length;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  constructor(
    private repo: ProductRepository,
    private order: OrderRepository,
    private router: Router
  ) {}

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
    return this.cartProducts.slice(0, this.cartProdsPerPage);
  }

  getSelectOptions = (): Array<any> => {
    return new Array(localStorage.length);
  };

  changeCartSize = (newSize: number) => {
    this.cartProdsPerPage = newSize;
    console.log(newSize);
  };

  removeCartItem = (e: number) => {
    console.log(e);
    localStorage.removeItem(`${e}`);
    this.repo.getProducts().forEach(prod => {
      if (e == prod.id) prod.inCart = false;
    });
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

  submitOrderForm = (form: NgForm) => {
    if (form.valid) {
      let items = { ...localStorage };
      let arr = [];
      for (const key in items) {
        if (items.hasOwnProperty(key)) {
          const element = items[key];
          arr.push(JSON.parse(element));
        }
      }

      let o = new Order(
        Math.floor(Math.random() * 100),
        `${this.firstname} ${this.lastname}`,
        this.address,
        this.city,
        this.state,
        this.zip,
        this.country,
        false,
        arr
      );
      console.log(o);
      this.order.saveOrder(o).subscribe(order => {
        localStorage.clear();
      });
    }
    this.router.navigateByUrl("/products");
  };

  getCheckoutTotal = (): string => {
    let items = { ...localStorage };
    let arr = [];
    let total = 0;
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        arr.push(JSON.parse(element));
      }
    }
    arr.forEach(prod => {
      total += Number(prod.price);
    });
    return `$${total}`;
  };
}

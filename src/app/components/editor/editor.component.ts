import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProductRepository } from "../../models/product.repository";
import { Product } from "../../models/product.model";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Order } from "src/app/models/order.model";
import { OrderRepository } from "src/app/models/order.repository";

declare var $: any;

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"]
})
export class EditorComponent implements OnInit {
  cartProducts: Product[];
  cartProdsPerPage = localStorage.length;
  name: string;
  category: string;
  description: string;
  price: number;
  selectedID: number;
  includeShipped = false;
  isShowingProducts = false;
  isShowingOrders = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private product: ProductRepository,
    private order: OrderRepository
  ) { }

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

    this.getOrders();
  }

  get cart(): Product[] {
    return this.cartProducts.slice(0, this.cartProdsPerPage);
  }

  get products(): Product[] {
    return this.product.getProducts(null).filter(i => !i.isDeleted);
  }

  deleteOrder(ord: Order) {
    this.order.deleteOrder(ord.id);
    ord.isDeleted = true;
  }

  deleteProduct(prod: Product) {
    this.product.deleteProduct(prod.id);
    prod.isDeleted = true;
  }

  getOrders(): Order[] {
    return this.order.getOrders().filter(i => !i.isDeleted);
  }

  submit(form: NgForm) {
    if (form.valid) {
      let prod = new Product(
        null,
        this.name,
        this.description,
        "none",
        this.category,
        this.price,
        false,
        false
      );
      this.product.saveProduct(prod);
      $(".bd-example-modal-xl").modal("hide");
    }
  }

  submitUpdate(form: NgForm) {
    if (form.valid) {
      let prod = new Product(
        this.selectedID,
        this.name,
        this.description,
        "none",
        this.category,
        this.price,
        false,
        false
      );
      this.product.updateProduct(prod);
      $(".bd-edit-modal-xl").modal("hide");
    }
  }

  productID(id: number) {
    this.selectedID = id;
  }

  logout() {
    this.auth.clear();
    this.router.navigateByUrl("/");
  }
}

import { Component, OnInit } from "@angular/core";
import { ProductRepository } from "../../models/product.repository";
import { Product } from "../../models/product.model";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  cartProducts: Product[];
  cartProdsPerPage = localStorage.length;

  constructor(
    private auth: AuthService,
    private router: Router,
    private repo: ProductRepository
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

  logout() {
    this.auth.clear();
    this.router.navigateByUrl("/");
  }
}

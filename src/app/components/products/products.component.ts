import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/services/rest.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productsPerPage = 4;
  selectedPage = 1;
  constructor(private rest: RestService) {}

  ngOnInit() {
    this.rest.getProducts().subscribe(
      (prod: any) => {
        this.products = prod;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  getProducts = (): Product[] => {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.products.slice(pageIndex, pageIndex + this.productsPerPage);
  };
}

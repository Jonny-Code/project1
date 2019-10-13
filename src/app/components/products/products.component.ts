import { Component } from "@angular/core";
import { ProductRepository } from "../../models/product.repository";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  selectedCategory = null;
  productsPerPage = 3;
  constructor(private repo: ProductRepository) {}

  ngOnInit() {}

  get products(): Product[] {
    return this.repo
      .getProducts(this.selectedCategory)
      .slice(0, this.productsPerPage);
  }

  get categories(): string[] {
    return this.repo.getCategories();
  }

  changePageSize = (newSize: number) => {
    this.productsPerPage = Number(newSize);
  };

  changeCategory = (newCategory?: string) => {
    this.selectedCategory = newCategory;
  };
}

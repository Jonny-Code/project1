import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";

@Injectable({
  providedIn: "root"
})
export class RestService {
  auth_token: string;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      "http://localhost:3500/orders/",
      this.getOptions()
    );
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>("http://localhost:3500/orders/", order);
  }

  deleteOrder(id: number): Subscription {
    return this.http
      .delete("http://localhost:3500/orders/" + id, this.getOptions())
      .subscribe(
        val => {
          console.log("DELETE call successful value returned in body", val);
        },
        response => {
          console.log("DELETE call in error", response);
        },
        () => {
          console.log("The DELETE observable is now completed.");
        }
      );
  }

  getProducts = (): Observable<Object> => {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.get<Object[]>("http://localhost:3500/products/");
  };

  authenticate = (user: string, pass: string): Observable<boolean> => {
    return this.http
      .post<any>("http://localhost:3500/login", { name: user, password: pass })
      .pipe(
        map(res => {
          this.auth_token = res.success ? res.token : null;
          return res.success;
        })
      );
  };

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      "http://localhost:3500/products/",
      product,
      this.getOptions()
    );
  }

  updateProduct(product): Observable<Product> {
    return this.http.put<Product>(
      `http://localhost:3500/products/${product.id}`,
      product,
      this.getOptions()
    );
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer<${this.auth_token}>`
      })
    };
  }
}

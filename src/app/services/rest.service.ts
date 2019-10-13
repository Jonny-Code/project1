import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RestService {
  constructor(private http: HttpClient) {}

  getProducts = (): Observable<Object> => {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.get<Object[]>("http://localhost:3500/products/");
  };
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestService {
  auth_token: string;

  constructor(private http: HttpClient) {}

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
}

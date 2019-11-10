import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { UserNavComponent } from "./components/user-nav/user-nav.component";
import { RestService } from "./services/rest.service";
import { HttpClientModule } from "@angular/common/http";
import { ProductRepository } from "./models/product.repository";
import { AuthComponent } from "./components/auth/auth.component";
import { EditorComponent } from "./components/editor/editor.component";

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    HomeComponent,
    ProductsComponent,
    UserNavComponent,
    AuthComponent,
    EditorComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [RestService, ProductRepository],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { UserNavComponent } from "./components/user-nav/user-nav.component";
import { RestService } from "./services/rest.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    HomeComponent,
    ProductsComponent,
    UserNavComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule {}

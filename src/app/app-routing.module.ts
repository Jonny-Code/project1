import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { AuthComponent } from "./components/auth/auth.component";
import { CreateComponent } from "./components/create/create.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "admin", component: AuthComponent },
  { path: "create", component: CreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

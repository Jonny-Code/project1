import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { AuthComponent } from "./components/auth/auth.component";
import { EditorComponent } from "./components/editor/editor.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "checkout", component: CheckoutComponent },
  {
    path: "admin",
    children: [
      { path: "auth", component: AuthComponent },
      { path: "editor", component: EditorComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

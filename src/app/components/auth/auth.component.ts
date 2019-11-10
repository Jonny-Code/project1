import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  username: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {}

  authenticate(form: NgForm) {
    if (form.valid) {
      this.auth
        .authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            console.log(response);
            this.router.navigateByUrl("/create");
          }
          console.log("didnt work " + response);
        });
    }
  }

  ngOnInit() {}
}

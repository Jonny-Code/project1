import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: string;
  company: string;
  email: string;
  location: string;

  constructor() {}

  ngOnInit() {
    let item = { ...JSON.parse(sessionStorage.getItem("account")) };
    console.log(item);
    this.name = item.name;
    this.company = item.company;
    this.email = item.email;
    this.location = item.location;
  }

  submit(form: NgForm) {
    if (sessionStorage.length > 0)
      sessionStorage.setItem("account", JSON.stringify(form.value));
  }
}

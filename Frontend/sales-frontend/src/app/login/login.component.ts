import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  imagepath = "assets/images/figma2.jpg";
  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      companyemail:['', Validators.required],
      password:['', Validators.required]
    })
  }

  login() {

    this.http.get<any>("http://localhost:3000/signup")

    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.companyemail === this.loginForm.value.companyemail && a.password === this.loginForm.value.password
      });

      if(user){
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['dashboard']);

      }else{
        alert("Company Not Found");
      }
    }, err=>{
      alert("Something went wrong");
    })
  }

}


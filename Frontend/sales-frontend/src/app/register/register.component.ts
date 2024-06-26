import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      companyname: ['', Validators.required],
      companyemail:['', Validators.required],
      password:['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      pincode:['', Validators.required],
      country:['', Validators.required]
    })
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signup",this.signupForm.value)
    .subscribe(res=>{
      alert("SignUp Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);

    }, err=>{
      alert("Something went wrong");
    }
    )
  }

}


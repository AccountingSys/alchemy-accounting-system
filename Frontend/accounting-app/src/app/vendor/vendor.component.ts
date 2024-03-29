import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '../models/vendor';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent  {
  vendorForm!:FormGroup
  vendor: Vendor[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,private vendorService :VendorService){

   this.vendorForm = this.fb.group({
    vendorName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,}')]],
    vendorEmail: ['', Validators.required]
  });
   
  }
  onSubmit() {
    if (this.vendorForm.valid) {
      this.vendorService.createVendor(this.vendorForm.value).subscribe(
        response => {
          this.vendorForm.reset();
          alert('Vendor added successfully');
        },
        error => {
          
          console.error('Error adding vendor:', error);
          alert('Failed to add vendor. Please try again later.');
        }
      );
    } else {
      
      this.vendorForm.markAllAsTouched();
    }
  }
}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SalesTableComponent } from './sales-table/sales-table.component';

const routes: Routes = [
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index', component:IndexComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'invoice-details', component:InvoiceDetailsComponent},
  {path:'sales-table', component:SalesTableComponent},
  {path:'invoice-view/:id', component:InvoiceViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

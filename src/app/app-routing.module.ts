import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookroomComponent } from './bookroom/bookroom.component';
import { NewbookingComponent } from './bookroom/newbooking/newbooking.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  }
  ,
  {
    component: RegisterComponent,
    path: 'register'
  }
  ,
  {
    component: LoginComponent,
    path: 'login'
  }
  ,
  {
    component: DashboardComponent,
    path: 'dashboard'
  }
  ,
  {
    component: BookroomComponent,
    path: 'booking'
  }
  ,
  {
    component: NewbookingComponent,
    path: 'newbooking'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

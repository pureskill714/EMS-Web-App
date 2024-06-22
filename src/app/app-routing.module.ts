import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; // Import AuthGuard
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookroomComponent } from './bookroom/bookroom.component';
import { NewbookingComponent } from './bookroom/newbooking/newbooking.component';
import { CancelbookingComponent } from './bookroom/cancelbookingconfirmation/cancelbooking.component';
import { BookingconfirmationComponent } from './bookroom/bookingconfirmation/bookingconfirmation.component';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisteraccountconfirmationComponent } from './register/registeraccountconfirmation/registeraccountconfirmation.component';
import { NonverifiedaccountmessageComponent } from './login/nonverifiedaccountmessage/nonverifiedaccountmessage.component';
import { AccountverificationComponent } from './register/accountverification/accountverification.component';
import { ManageRoomsComponent } from './manage-rooms/manage-rooms.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AddroomconfirmationComponent } from './manage-rooms/addroomconfirmation/addroomconfirmation.component';
import { DeleteroomconfirmationComponent } from './manage-rooms/deleteroomconfirmation/deleteroomconfirmation.component';
import { EditroomconfirmationComponent } from './manage-rooms/editroomconfirmation/editroomconfirmation.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { CancelbookingconfirmationadminComponent } from './manage-bookings/cancelbookingconfirmationadmin/cancelbookingconfirmationadmin.component';


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
    component: RegisteraccountconfirmationComponent,
    path: 'registerconfirmation'
  }
  ,
  {
    component: LoginComponent,
    path: 'login'
  }
  ,
  {
    component: NonverifiedaccountmessageComponent,
    path: 'unverifiedaccount'
  }
  ,
  {
    component: AccountverificationComponent,
    path: 'verify/:token', 
  }
  ,
  {
    component: DashboardComponent,
    path: 'dashboard',
    //canActivate: [AuthGuard]
  }
  ,
  {
    component: AdminDashboardComponent,
    path: 'admin-dashboard',
  }
  ,
  {
    component: BookroomComponent,
    path: 'booking',
    //canActivate: [AuthGuard]
  }
  ,
  {
    component: NewbookingComponent,
    path: 'newbooking'
  }
  ,
  {
    component: CancelbookingComponent,
    path: 'cancelbooking'
  }
  ,
  {
    component: BookingconfirmationComponent,
    path: 'confirmbooking'
  }
  ,
  {
    component: EmployeeinfoComponent,
    path: 'employeeinfo'
  }
  ,
  {
    component: ProfileComponent,
    path: 'profile'
  }
  ,
  {
    component: ManageRoomsComponent ,
    path: 'manage-rooms'
  }
  ,
  {
    component: AddroomconfirmationComponent ,
    path: 'confirm-add-room'
  }
  ,
  {
    component: DeleteroomconfirmationComponent,
    path: 'confirm-delete-room'
  }
  ,
  {
    component: EditroomconfirmationComponent,
    path : 'confirm-edit-room'
  }
  ,
  {
    component: ManageBookingsComponent,
    path: 'manage-bookings'
  }
  ,
  {
    component: CancelbookingconfirmationadminComponent,
    path: 'cancelbooking-admin'

  }
  ,
  {
    component: NotAuthorizedComponent ,
    path: 'not-authorized'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

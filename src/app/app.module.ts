import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { BookroomComponent } from './bookroom/bookroom.component';
import { NewbookingComponent } from './bookroom/newbooking/newbooking.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingConfirmationDialogComponent } from './bookroom/booking-confirmation-dialog/booking-confirmation-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CancelbookingComponent } from './bookroom/cancelbookingconfirmation/cancelbooking.component';
import { BookingconfirmationComponent } from './bookroom/bookingconfirmation/bookingconfirmation.component';
import { BookingCancellationDialogComponent } from './bookroom/booking-cancellation-dialog/booking-cancellation-dialog.component';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisteraccountconfirmationComponent } from './register/registeraccountconfirmation/registeraccountconfirmation.component';
import { NonverifiedaccountmessageComponent } from './login/nonverifiedaccountmessage/nonverifiedaccountmessage.component';
import { AccountverificationComponent } from './register/accountverification/accountverification.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageRoomsComponent } from './manage-rooms/manage-rooms.component';
import { AddroomConfirmationDialogComponent } from './manage-rooms/addroom-confirmation-dialog/addroom-confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { DeleteroomConfirmationDialogComponent } from './manage-rooms/deleteroom-confirmation-dialog/deleteroom-confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    BookroomComponent,
    NewbookingComponent,
    BookingConfirmationDialogComponent,
    CancelbookingComponent,
    BookingconfirmationComponent,
    BookingCancellationDialogComponent,
    EmployeeinfoComponent,
    ProfileComponent,
    RegisteraccountconfirmationComponent,
    NonverifiedaccountmessageComponent,
    AccountverificationComponent,
    AdminDashboardComponent,
    HeaderAdminComponent,
    ManageRoomsComponent,
    AddroomConfirmationDialogComponent,
    DeleteroomConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }

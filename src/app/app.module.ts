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
import { EditroomnameConfirmationDialogComponent } from './manage-rooms/editroomname-confirmation-dialog/editroomname-confirmation-dialog.component';
import { EditroomorderConfirmationDialogComponent } from './manage-rooms/editroomorder-confirmation-dialog/editroomorder-confirmation-dialog.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AddroomconfirmationComponent } from './manage-rooms/addroomconfirmation/addroomconfirmation.component';
import { DeleteroomconfirmationComponent } from './manage-rooms/deleteroomconfirmation/deleteroomconfirmation.component';
import { EditroomconfirmationComponent } from './manage-rooms/editroomconfirmation/editroomconfirmation.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { BookingCancellationDialogAdminComponent } from './manage-bookings/booking-cancellation-dialog-admin/booking-cancellation-dialog-admin.component';
import { CancelbookingconfirmationadminComponent } from './manage-bookings/cancelbookingconfirmationadmin/cancelbookingconfirmationadmin.component';
import { NewbookingadminComponent } from './manage-bookings/newbookingadmin/newbookingadmin.component';
import { BookingconfirmationadminComponent } from './manage-bookings/bookingconfirmationadmin/bookingconfirmationadmin.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MeetingroominfoComponent } from './meetingroominfo/meetingroominfo.component';
import { EditroomcapacityConfirmationDialogComponent } from './manage-rooms/editroomcapacity-confirmation-dialog/editroomcapacity-confirmation-dialog.component';
import { EditroomlocationConfirmationDialogComponent } from './manage-rooms/editroomlocation-confirmation-dialog/editroomlocation-confirmation-dialog.component';
import { EditroomcapacityconfirmationComponent } from './manage-rooms/editroomcapacityconfirmation/editroomcapacityconfirmation.component';
import { EditroomlocationconfirmationComponent } from './manage-rooms/editroomlocationconfirmation/editroomlocationconfirmation.component';



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
    EditroomnameConfirmationDialogComponent,
    EditroomorderConfirmationDialogComponent,
    NotAuthorizedComponent,
    AddroomconfirmationComponent,
    DeleteroomconfirmationComponent,
    EditroomconfirmationComponent,
    ManageBookingsComponent,
    BookingCancellationDialogAdminComponent,
    CancelbookingconfirmationadminComponent,
    NewbookingadminComponent,
    BookingconfirmationadminComponent,
    ManageAccountsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    MeetingroominfoComponent,
    EditroomcapacityConfirmationDialogComponent,
    EditroomlocationConfirmationDialogComponent,
    EditroomcapacityconfirmationComponent,
    EditroomlocationconfirmationComponent,
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

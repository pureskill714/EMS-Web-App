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
import { BookroomComponent } from './bookroom/bookroom.component';
import { NewbookingComponent } from './bookroom/newbooking/newbooking.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagerDashboardComponent } from './project-manager-dashboard/project-manager-dashboard.component';
import { BookingConfirmationDialogComponent } from './bookroom/booking-confirmation-dialog/booking-confirmation-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';


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
    ProjectManagerDashboardComponent,
    BookingConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingCancellationDialogAdminComponent } from '../manage-bookings/booking-cancellation-dialog-admin/booking-cancellation-dialog-admin.component';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrl: './manage-accounts.component.css'
})
export class ManageAccountsComponent {
  retrievedEmployeeDetails: any[] = [];
  roleCheck: string | null = null;

  constructor(private userDataService: UserDataService, private http: HttpClient, private location: Location,
    private authService: AuthService,private router: Router,private dialog: MatDialog) {

      this.roleCheck = this.userDataService.getRole();

      if (this.roleCheck != "admin") {
        this.router.navigate(["not-authorized"]);
        this.authService.kickUser(); // Call AuthService kick user method
      }
    }

    ngOnInit(): void {
      this.getEmployeeDetails();
    }
    

    getEmployeeDetails() {
      
      this.http.get("http://192.168.10.110:9992/getemployeedetails").subscribe(
        (resultData: any) => {
          console.log(resultData);
  
          // Check if the response contains data and handle accordingly
        if (resultData) {
          console.log("retrieved employee data success");
          this.retrievedEmployeeDetails = resultData;
        }
        else {
          console.log("retrieved employee data failed");
        }
      }
      );
    }

    deleteAccount(accountId: string) {
      
      let bodyData = {
        "id": accountId,
      };

      const dialogRef = this.dialog.open(BookingCancellationDialogAdminComponent, {
        width: '420px',
        panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
        hasBackdrop: true, // Display backdrop behind the dialog
        backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'cancel') {
          // Call your backend service to cancel the booking
          this.http.post<any>('http://192.168.10.110:9992/deleteaccount', bodyData)
        .subscribe(
          (resultData: any) => {
            console.log(resultData);
  
            if (resultData.status) {
              console.log('Delete account success:', resultData);
              this.router.navigate(['/cancelbooking-admin']);
            }
            else {
              // Error: Handle error
              console.log('Delete account failed:', resultData.message);
            }
          },
          (error) => {
            // Error: Handle HTTP error
            console.error('(HTTP error) Delete Account failed', error);
            alert('(HTTP error) Delete Account failed');
          })  
        }
        else{
          console.log("Account was not deleted")
        }
      })  

    }

    

}

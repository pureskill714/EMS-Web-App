import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-editroomcapacityconfirmation',
  templateUrl: './editroomcapacityconfirmation.component.html',
  styleUrl: './editroomcapacityconfirmation.component.css'
})
export class EditroomcapacityconfirmationComponent {
  meetingRoomName: string | null = null;
  roleCheck: string | null = null;

  constructor(private router: Router,private userDataService: UserDataService,private authService: AuthService) {
    this.roleCheck = this.userDataService.getRole();
    console.log("role check below")
    console.log(this.roleCheck)
    if (this.roleCheck != "admin") {
      this.router.navigate(["not-authorized"]);
      this.authService.kickUser(); // Call AuthService kick user method
    }
    
    this.meetingRoomName = this.userDataService.getMeetingRoom()
  }

  returnToRoomManagementPage(): void {
    this.router.navigate(['/manage-rooms']);
  }

}

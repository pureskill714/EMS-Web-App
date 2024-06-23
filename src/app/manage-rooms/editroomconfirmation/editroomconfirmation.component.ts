import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-editroomconfirmation',
  templateUrl: './editroomconfirmation.component.html',
  styleUrl: './editroomconfirmation.component.css'
})
export class EditroomconfirmationComponent {
  oldMeetingRoomName: string | null = null;
  newMeetingRoomName: string | null = null;

  
  constructor(private router: Router,private userDataService: UserDataService,private authService: AuthService) {
    this.oldMeetingRoomName = this.userDataService.getOldMeetingRoomName();
    this.newMeetingRoomName = this.userDataService.getnewMeetingRoomName();
  }

  returnToRoomManagementPage(): void {
    this.router.navigate(['/manage-rooms']);
  }

}

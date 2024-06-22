import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-deleteroomconfirmation',
  templateUrl: './deleteroomconfirmation.component.html',
  styleUrl: './deleteroomconfirmation.component.css'
})
export class DeleteroomconfirmationComponent {
  deletedMeetingRoom: string | null = null;

  constructor(private router: Router,private userDataService: UserDataService,private authService: AuthService) {
    this.deletedMeetingRoom = this.userDataService.getDeletedMeetingRoom();
  }

  returnToRoomManagementPage(): void {
    this.router.navigate(['/manage-rooms']);
  }

}

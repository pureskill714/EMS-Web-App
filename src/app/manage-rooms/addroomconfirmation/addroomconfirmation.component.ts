import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-addroomconfirmation',
  templateUrl: './addroomconfirmation.component.html',
  styleUrl: './addroomconfirmation.component.css'
})
export class AddroomconfirmationComponent {
  newMeetingRoom: string | null = null;

  
  constructor(private router: Router,private userDataService: UserDataService,private authService: AuthService) {
    this.newMeetingRoom = this.userDataService.getnewMeetingRoomName();
  }

  returnToRoomManagementPage(): void {
    this.router.navigate(['/manage-rooms']);
  }

}

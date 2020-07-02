import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-guest-settings',
  templateUrl: './guest-settings.component.html',
  styleUrls: ['./guest-settings.component.css']
})
export class GuestSettingsComponent implements OnInit {

  user = null;
  editSuccessful = false;

  constructor(private adminService: AdminService, private authService: AuthService) { }
  ngOnInit(): void {
    this.editSuccessful = false;
    this.authService.getUser()
      .subscribe( res => {
        this.user = res.user[0];
      });
  }

  onSubmitEditForm(EditForm: NgForm) {
    console.log(EditForm.value);
    this.adminService.editUser(EditForm.value, this.user._id)
      .subscribe(() => {
        console.log('User edited successfully');
        this.editSuccessful = true;
        this.authService.getUser()
          .subscribe( res => {
            this.user = res.user[0];
          });
      });
  }
}

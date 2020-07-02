import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-my-qr-code',
  templateUrl: './my-qr-code.component.html',
  styleUrls: ['./my-qr-code.component.css']
})
export class MyQrCodeComponent implements OnInit {

  user = null;
  qrCodeValue = '';
  elementType = 'url';

  constructor(private adminService: AdminService, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getUser()
      .subscribe( res => {
        this.user = res.user[0];
        this.qrCodeValue = this.user.id.toString() + '-' + this.user.firstName;
      });
  }
}

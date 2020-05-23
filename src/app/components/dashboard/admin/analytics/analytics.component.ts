import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  isChecked: boolean;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getSMSApiStatus()
      .subscribe( res => {
        this.isChecked = res.AT;
      });

  }

  APIchanged() {
    this.adminService.toggleSMSApiStatus()
      .subscribe( res => {
        this.isChecked = res.AT;
      });
  }
}

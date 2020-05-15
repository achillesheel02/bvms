import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  roles = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser().subscribe( res => {
        this.user = res.user[0];
      }
    );
  }



}

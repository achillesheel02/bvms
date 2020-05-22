import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {AuthService} from '../../../services/auth.service';
import {BuildingService} from '../../../services/building.service';
import {BusinessService} from '../../../services/business.service';

@Component({
  selector: 'app-business-owner',
  templateUrl: './business-owner.component.html',
  styleUrls: ['./business-owner.component.css']
})
export class BusinessOwnerComponent implements OnInit {

  tab = 2;

  ngOnInit(): void {
  }
  pageSwitcher(index){
    this.tab = index;
  }

}

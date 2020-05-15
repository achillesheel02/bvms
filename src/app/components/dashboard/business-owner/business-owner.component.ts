import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-owner',
  templateUrl: './business-owner.component.html',
  styleUrls: ['./business-owner.component.css']
})
export class BusinessOwnerComponent implements OnInit {

  tab = 1;
  constructor() { }

  ngOnInit(): void {
  }
  pageSwitcher(index){
    this.tab = index;
  }

}

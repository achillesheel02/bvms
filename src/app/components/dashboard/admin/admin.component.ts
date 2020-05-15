import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tab = 1;
  constructor() { }

  ngOnInit(): void {
  }

  pageSwitcher(index){
    this.tab = index;
  }

}

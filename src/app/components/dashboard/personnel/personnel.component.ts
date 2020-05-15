import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  tab = 1;
  constructor() { }

  ngOnInit(): void {
  }

  pageSwitcher(index){
    this.tab = index;
  }
}

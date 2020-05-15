import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-owner',
  templateUrl: './building-owner.component.html',
  styleUrls: ['./building-owner.component.css']
})
export class BuildingOwnerComponent implements OnInit {
  tab = 1;

  constructor() { }

  ngOnInit(): void {
  }

  pageSwitcher(index) {
    this.tab = index;
  }

}

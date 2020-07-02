import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  tab = 1;
  constructor() { }

  ngOnInit(): void {
  }

  pageSwitcher(index){
    this.tab = index;
  }
}

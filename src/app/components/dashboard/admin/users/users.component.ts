import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../../../services/admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NgForm} from '@angular/forms';
import {MatHeaderRowDef, MatRowDef} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  displayedColumns = ['firstName', 'lastName', 'id', 'phoneNumber', 'roles'];
  dataSource: MatTableDataSource<{firstName: string, lastName: string, id: number, phoneNumber: number, roles: string []}>;
  data = [];



  menuItem = 1;
  selected: any;
  loaded = false;

  constructor(private adminService: AdminService) {
    this.adminService.fetchAllUsers()
      .subscribe( res => {
        res.users.forEach( x => {
          this.data.push({
            firstName: x.firstName,
            lastName: x.lastName,
            id: x.id,
            phoneNumber: x.phoneNumber,
            roles: x.roles
          });
        });
        this.dataSource = new MatTableDataSource(this.data);
      });
  }



  ngOnInit(): void {

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateUserData() {
    this.adminService.fetchAllUsers()
      .subscribe( res => {
        res.users.forEach( x => {
          this.data.push({
            firstName: x.firstName,
            lastName: x.lastName,
            id: x.id,
            phoneNumber: x.phoneNumber,
            roles: x.roles
          });
        });
        this.dataSource = new MatTableDataSource(this.data);
      });
  }

  onSubmit(form: NgForm) {
    this.adminService.addUser(form.value)
      .subscribe( res => {
        this.data=[];
        console.log('User added successfully!');
        this.updateUserData();
      });
  }
}

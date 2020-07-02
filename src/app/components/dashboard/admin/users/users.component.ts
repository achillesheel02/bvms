import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns = ['firstName', 'lastName', 'id', 'phoneNumber', 'roles', 'actions'];
  dataSource: MatTableDataSource<{firstName: string, lastName: string, id: number, phoneNumber: number, roles: string []}>;
  data = [];
  showEditForm=false;
  specifiedUserId = null;
  addSuccessful = false;
  editSuccessful = false;


  menuItem = 1;
  selected: any;
  loaded = false;
  firstName: any;
  lastName: any;
  id: any;
  email: any;
  phoneNumber: any;

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {
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
        this.cdr.detectChanges();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
    this.data = [];
    this.adminService.fetchAllUsers()
      .subscribe( res => {
        res.users.forEach( x => {
          this.data.push({
            userId: x._id,
            firstName: x.firstName,
            lastName: x.lastName,
            id: x.id,
            phoneNumber: x.phoneNumber,
            roles: x.roles
          });
        });
        this.dataSource = new MatTableDataSource(this.data);
        this.cdr.detectChanges();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  onSubmit(form: NgForm) {
    this.adminService.addUser(form.value)
      .subscribe( res => {
        this.data =[];
        console.log('User added successfully!');
        this.updateUserData();
        this.addSuccessful = true;
        form.reset();
      });
  }

  editUser(userId: number) {
    this.showEditForm = true;
    this.editSuccessful = false;
    const userEdit = this.data.find( x => x.id === userId);
    this.specifiedUserId = userEdit.userId;
    this.firstName = userEdit.firstName;
    this.lastName = userEdit.lastName;
    this.id = userEdit.id;
    this.phoneNumber = userEdit.phoneNumber;
    this.email = userEdit.email;
  }

  deleteUser(userId: number) {
    this.adminService.deleteUser(userId)
      .subscribe( () => {
        console.log('User deleted successfully');
        this.updateUserData();
      });
  }

  onSubmitEditForm(EditForm: NgForm) {
    console.log(EditForm.value);
    this.adminService.editUser(EditForm.value, this.specifiedUserId)
      .subscribe(() => {
        console.log('User edited successfully');
        this.showEditForm = false;
        this.updateUserData();
        this.editSuccessful = true;
        EditForm.reset();
      });
  }
}

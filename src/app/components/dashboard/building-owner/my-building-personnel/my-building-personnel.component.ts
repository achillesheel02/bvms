import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BuildingService} from '../../../../services/building.service';
import {AuthService} from '../../../../services/auth.service';
import {AdminService} from '../../../../services/admin.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-my-building-personnel',
  templateUrl: './my-building-personnel.component.html',
  styleUrls: ['./my-building-personnel.component.css']
})
export class MyBuildingPersonnelComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  locationAcquired = false;
  displayedColumns: string[] = ['name', 'id', 'building', 'actions'];
  dataSource: MatTableDataSource<{ name: string, id: number, building: string }>;
  menuItem = 1;
  personnel = [];
  buildings = [];
  user = null;
  showEditForm = false;
  personnelEditInfo: {firstName: string, lastName: string, id: number, phoneNumber: number, email: string} =
    {
      firstName: '',
      lastName: '',
      id: null,
      phoneNumber: null,
      email: ''
    };

  constructor( private buildingService: BuildingService, private authService: AuthService, private adminService: AdminService, private cdr: ChangeDetectorRef) {
    this.authService.getUser()
      .subscribe( res => {
        this.user = res.user[0];
        this.buildingService.fetchMyBuildings(this.user._id)
          .subscribe( build => {
            build.buildings.forEach( x => {
              this.buildings.push(x);
            });
          });
        this.buildingService.fetchAllPersonnel(this.user._id)
          .subscribe( res2 => {
            console.log(res2);
            res2.buildings.forEach( x => {
              x.personnel.forEach( y => {
               this.adminService.fetchUserNameById(y)
                  .subscribe( z => {
                    const personnel = z.user[0];
                    this.personnel.push({
                      name: personnel.firstName + ' ' + personnel.lastName,
                      id: personnel.id,
                      building: x.name
                    });
                    this.dataSource = new MatTableDataSource(this.personnel);
                    this.cdr.detectChanges();
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                    console.log(this.personnel);
                  });
              });
            });
          }); });
  }

  ngOnInit(): void {
  }

  editPersonnel(id: any) {
    this.adminService.fetchUser(id)
      .subscribe( res => {
        this.personnelEditInfo = {
          firstName: res.user[0].firstName,
          lastName: res.user[0].lastName,
          id: res.user[0].id,
          email: res.user[0].email,
          phoneNumber: res.user[0].phoneNumber
        };
        this.showEditForm = true;
      });
  }

  deletePersonnel(id: number) {
    this.adminService.deleteUser(id)
      .subscribe( () => {
        console.log('User deleted successfully');
        this.updatePersonnelData();
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updatePersonnelData() {
    this.personnel =[];
    this.authService.getUser()
      .subscribe( res => {
        this.user = res.user[0];
        this.buildingService.fetchAllPersonnel(this.user._id)
          .subscribe( res2 => {
            console.log(res2);
            res2.buildings.forEach( x => {
              x.personnel.forEach( y => {
                this.adminService.fetchUserNameById(y)
                  .subscribe( z => {
                    const personnel = z.user[0];
                    this.personnel.push({
                      name: personnel.firstName + ' ' + personnel.lastName,
                      id: personnel.id,
                      building: x.name
                    });
                    this.dataSource = new MatTableDataSource(this.personnel);
                    this.cdr.detectChanges();
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                    console.log(this.personnel);
                  });
              });
            });
          }); });
  }

  onSubmitEditForm(EditForm: NgForm) {
    this.adminService.editUser(EditForm.value, this.personnelEditInfo.id)
      .subscribe(() => {
        console.log('User edited successfully');
        this.showEditForm = false;
        this.updatePersonnelData();
        EditForm.reset();
      });
  }

  onSubmitPersonnel(personnelForm: NgForm) {
    console.log(personnelForm.value);
    const formData = {
      firstName: personnelForm.value.firstName,
      lastName: personnelForm.value.lastName,
      roles: ['personnel'],
      phoneNumber: personnelForm.value.phoneNumber,
      id: personnelForm.value.id,
      email: personnelForm.value.email,
      password: personnelForm.value.password
    };

    this.buildingService.addPersonnel(formData, personnelForm.value.building)
      .subscribe( () => {
        console.log('Personnel added successfully');
        personnelForm.reset();
        this.updatePersonnelData();
      });
  }
}

import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BuildingService} from '../../../../services/building.service';
import {AuthService} from '../../../../services/auth.service';
import {AdminService} from '../../../../services/admin.service';

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
  user = null;


  constructor( private buildingService: BuildingService, private authService: AuthService, private adminService: AdminService, private cdr: ChangeDetectorRef) {
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

  ngOnInit(): void {
  }

  editPersonnel(id: any) {

  }

  deletePersonnel(id: any) {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

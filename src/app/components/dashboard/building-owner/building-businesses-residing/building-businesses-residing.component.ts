import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../services/auth.service';
import {BuildingService} from '../../../../services/building.service';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-building-businesses-residing',
  templateUrl: './building-businesses-residing.component.html',
  styleUrls: ['./building-businesses-residing.component.css']
})
export class BuildingBusinessesResidingComponent implements OnInit {
  menuItem = 1;
  businesses = [];
  buildings = [];
  user = null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['name', 'businessOwner', 'building', 'created_at', 'actions'];
  dataSource: MatTableDataSource<{ name: string, businessOwner: string, created_at: Date, building: string }>;

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private buildingService: BuildingService, private adminService: AdminService,  private cdr: ChangeDetectorRef) {
    this.authService.getUser()
      .subscribe( res => {
        this.user = res.user[0];
        this.buildingService.fetchMyBuildings(this.user._id)
          .subscribe( res2 => {
            res2.buildings.forEach( x => {
              this.buildings.push(x);
              res2.buildings.forEach( building => {
                this.buildingService.fetchMyBusinesses(building._id)
                  .subscribe( z => {
                    console.log(z);
                    z.businesses.forEach( item => {
                      this.adminService.fetchUserNameById(item.businessOwner)
                        .subscribe( user => {
                          const businessOwner = user.user[0].firstName + ' ' + user.user[0].lastName;
                          this.businesses.push({
                            id: item._id,
                            name: item.name,
                            businessOwner,
                            building: building.name,
                            created_at: item.created_at
                          });
                          this.dataSource = new MatTableDataSource(this.businesses);
                          this.cdr.detectChanges();
                          this.dataSource.sort = this.sort;
                          this.dataSource.paginator = this.paginator;
                        });

                      });
                });
              });
              });
            });
          });
  }

  ngOnInit(): void {
    console.log(this.businesses);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBusiness(id: any) {
    console.log(id);
  }
}

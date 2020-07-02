import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {VisitService} from '../../../../services/visit.service';
import {AuthService} from '../../../../services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../../../services/admin.service';
import {BuildingService} from '../../../../services/building.service';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['businessVisiting', 'timeIn' , 'timeOut' , 'checkedOut' , 'itemsCarried'];
  dataSource: MatTableDataSource<{  businessVisiting: string, checkedOut: boolean , itemsCarried: string [], timeIn: Date, timeOut: Date }>;
  constructor(private visitService: VisitService, private authService: AuthService, private adminService: AdminService, private cdr: ChangeDetectorRef, private buildingService: BuildingService) { }

  user = null;
  visits = [];
  buildingMarkers = [];
  options2: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 6,
    clickableIcons: false
  };
  ngOnInit(): void {
    this.authService.getUser()
      .subscribe(res => {
        this.user = res.user[0];
        this.visitService.fetchVisit(this.user._id)
          .subscribe(visits => {
            this.adminService.fetchAllBusinesses()
              .subscribe(businesses => {
                visits.visits.forEach(x => {
                  const business = businesses.businesses.find(y => y._id === x.businessVisiting);
                  this.buildingService.fetchByBusinesses(business.building)
                    .subscribe(res2 => {
                      res2.building.forEach(z => {
                        this.buildingMarkers.push(new google.maps.Marker({
                          position: {lng: z.geoLocation.longitude, lat: z.geoLocation.latitude},
                          animation: google.maps.Animation.BOUNCE,
                          title: z.name + ' on ' + x.timeIn,
                          clickable: false
                        }));
                      });
                    });
                  this.visits.push({
                        id: x._id,
                        businessVisiting: business.name,
                        itemsCarried: x.itemsCarried,
                        timeIn: x.timeIn,
                        timeOut: x.timeOut,
                        checkedOut: x.checkedOut
                      });
                    });
                this.dataSource = new MatTableDataSource(this.visits);
                this.cdr.detectChanges();
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                });
              });
          });
      }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {; } {
      this.dataSource.paginator.firstPage();
    }
  }
}

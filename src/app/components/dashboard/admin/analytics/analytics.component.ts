import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {MatTableDataSource} from '@angular/material/table';
import {VisitService} from '../../../../services/visit.service';
import {AuthService} from '../../../../services/auth.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  isChecked: boolean;
  buildings = [];
  businesses= [];
  buildingOwners = [];
  personnel = [];
  businessOwners = [];
  visits = [];
  options2: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 6,
    clickableIcons: false
  };

  visitsPerBusiness = [];
  buildingMarkers = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  showVisitsChart = false;

  public barChartData: ChartDataSets[] = [{
    data: [],
    label: 'Visits'
  }
  ];

  constructor(private adminService: AdminService, private visitService: VisitService, private authService: AuthService) {
    this.authService.getUser()
      .subscribe(res => {
        console.log(res);
        const guests = [];
        const businesses = [];
        const users = [];
        this.adminService.fetchUserByRole('guest')
          .subscribe(guest => {
            guest.users.forEach(x => {
              guests.push(x);
            });
          });
        this.adminService.fetchAllBusinesses()
          .subscribe(business => {
            business.businesses.forEach(x => {
              businesses.push(x);
            });
          });
        this.adminService.fetchAllUsers()
          .subscribe(res2 => {
            res2.users.forEach(x => {
              users.push(x);
            });
          });
        this.visitService.fetchAllVisits()
          .subscribe(visits => {
            visits.visits.forEach(x => {
              const guestInfo = guests.find(y => y._id === x.guest);
              const business = businesses.find(y => y._id === x.businessVisiting);
              const admittingPersonnel = users.find(y => y._id === x.admittingPersonnel);
              this.visits.push({
                id: x._id,
                admittingPersonnel: admittingPersonnel.firstName + ' ' + admittingPersonnel.lastName,
                guest: guestInfo.firstName + ' ' + guestInfo.lastName,
                businessVisiting: business.name,
                itemsCarried: x.itemsCarried,
                timeIn: x.timeIn,
                timeOut: x.timeOut,
                checkedOut: x.checkedOut
              });
            });
          });
      });
    this.adminService.fetchUserByRole('personnel')
      .subscribe(res2 => {
        res2.users.forEach(x => {
          this.personnel.push(x);
        });
      });
    this.adminService.fetchUserByRole('buildingOwner')
      .subscribe(res2 => {
        res2.users.forEach(x => {
          this.buildingOwners.push(x);
        });
      });
    const buildings = [];
    const businessOwners = [];
    this.adminService.fetchAllBuildings()
      .subscribe( res => {
        res.buildings.forEach(x => {
          buildings.push(x);
        });
        this.adminService.fetchUserByRole('businessOwner')
          .subscribe(res2 => {
            res2.users.forEach(x => {
              this.businessOwners.push(x);
              businessOwners.push(x);
            });
            this.adminService.fetchAllBusinesses()
              .subscribe(res3 => {
                console.log(res);
                res3.businesses.forEach(x => {
                  const businessOwner = businessOwners.find(y => y._id === x.businessOwner);
                  const building = buildings.find(y => y._id === x.building);
                  console.log(building);
                  this.businesses.push({
                    id: x._id,
                    name: x.name,
                    building: building.name,
                    businessOwner: businessOwner.firstName + ' ' + businessOwner.lastName,
                    floorNo: x.floorNo,
                    description: x.description
                  });
                });

              });
          });
      });
    this.adminService.fetchAllBuildings()
      .subscribe( res => {
        res.buildings.forEach(x => {
          let name;
          this.adminService.fetchUserNameById(x.buildingOwner)
            .subscribe( ans => {
              name = ans.user[0].firstName + ' ' + ans.user[0].lastName;
              // tslint:disable-next-line:max-line-length
              this.buildings.push({id: x._id, name: x.name, buildingOwner: name, location: x.location, floors: x.floors, geoLocation: x.geoLocation});
              this.buildingMarkers.push(new google.maps.Marker({
                position: {lng: x.geoLocation.longitude, lat: x.geoLocation.latitude},
                animation: google.maps.Animation.BOUNCE,
                title: x.name + ' owned by ' + name,
                clickable: false
              }));
            });
            });
        });
  }

  ngOnInit(): void {
    this.adminService.getSMSApiStatus()
      .subscribe( res => {
        this.isChecked = res.AT;
      });



  }

  APIchanged() {
    this.adminService.toggleSMSApiStatus()
      .subscribe( res => {
        this.isChecked = res.AT;
      });
  }
}

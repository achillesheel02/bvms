import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  locationAcquired = false;
  displayedColumns: string[] = ['name', 'buildingOwner', 'location', 'floors'];
  dataSource: MatTableDataSource<{ name: string, buildingOwner: string, location: string, floors: number }>;
  buildings = [];
  menuItem = 1;
  buildingOwners = [];
  lng = null;
  lat = null;
  selected: any;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 6,
  };
  marker: google.maps.Marker;

  location = '';
  private geoCoder: google.maps.Geocoder;


  constructor(private adminService: AdminService, private ngZone: NgZone) {
    this.adminService.fetchAllBuildings()
      .subscribe( res => {
        res.buildings.forEach(x => {
          let name;
          this.adminService.fetchUserNameById(x.buildingOwner)
            .subscribe( ans => {
              name = ans.user[0].firstName + ' ' + ans.user[0].lastName;
              this.buildings.push({name: x.name, buildingOwner: name, location: x.location, floors: x.floors});
              this.dataSource = new MatTableDataSource(this.buildings);
            });
        });
      });

    console.log(this.dataSource);
    this.adminService.fetchUserByRole('buildingOwner')
      .subscribe( res => {
        res.users.forEach(x => {
          this.buildingOwners.push(x);
        });
      });
  }

  ngOnInit(): void {
      this.geoCoder = new google.maps.Geocoder();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(form: NgForm) {

    const formData = {
      name: form.value.name,
      buildingOwner: form.value.buildingOwner,
      location: this.location,
      geoLocation: { latitude: this.lat, longitude: this.lng},
      floors: form.value.floors
    };
    this.adminService.addBuilding(formData)
      .subscribe( () => {
        console.log('Building added successfully');
        form.reset();
      });

  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.location = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  click($event: google.maps.MouseEvent) {
    this.locationAcquired = true;
    const lat = $event.latLng.lat();
    const lng = $event.latLng.lng();
    this.lat = lat;
    this.lng = lng;
    this.marker = new google.maps.Marker({
      position: {lng, lat},
      animation: google.maps.Animation.BOUNCE
    });
    console.log(this.getAddress(lat, lng));

  }



}

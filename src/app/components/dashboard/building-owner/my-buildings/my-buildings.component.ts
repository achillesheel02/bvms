import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../../../services/admin.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {BuildingService} from '../../../../services/building.service';

@Component({
  selector: 'app-my-buildings',
  templateUrl: './my-buildings.component.html',
  styleUrls: ['./my-buildings.component.css']
})
export class MyBuildingsComponent implements OnInit {


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  locationAcquired = false;
  displayedColumns: string[] = ['name', 'location', 'floors', 'actions'];
  dataSource: MatTableDataSource<{ name: string, buildingOwner: string, location: string, floors: number }>;
  buildings = [];
  menuItem = 1;
  buildingOwners = [];
  buildingMarkers = [];
  specifiedBuildingId = null;
  addSuccessful = false;
  editSuccessful = false;
  addPersonnelSuccessful = false;
  lng = null;
  lat = null;
  selected: any;
  location = '';
  editInfo: { id: number, name: string, location: string, floors: number, geoLocation: { latitude: number, longitude: number}} = {
    id: null,
    name: '',
    location: this.location,
    floors: 0,
    geoLocation: {latitude: this.lat, longitude: this.lng}
  };
  user = null;
  options2: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 6,
    clickableIcons: false
  };

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 6,
  };
  marker: google.maps.Marker;

  private geoCoder: google.maps.Geocoder;
  showEditForm = false;
  showPersonnelForm = false;
  personnelBuilding = null;


  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef, private authService: AuthService, private buildingService: BuildingService) {
    this.authService.getUser()
      .subscribe( res => {
        console.log(res);
        this.user = res.user[0];
        console.log(this.user);
        this.buildingService.fetchMyBuildings(this.user._id)
          .subscribe( res2 => {
            res2.buildings.forEach( x => {
              this.buildings.push(x);
              this.buildingMarkers.push(new google.maps.Marker({
                position: {lng: x.geoLocation.longitude, lat: x.geoLocation.latitude},
                animation: google.maps.Animation.BOUNCE,
                title: x.name,
                clickable: false
              }));
            });
            this.dataSource = new MatTableDataSource(this.buildings);
            this.cdr.detectChanges();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log(this.buildingMarkers);
          });
        console.log(this.dataSource);
      });
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
      buildingOwner: this.user._id,
      location: this.location,
      geoLocation: { latitude: this.lat, longitude: this.lng},
      floors: form.value.floors
    };
    this.adminService.addBuilding(formData)
      .subscribe( () => {
        console.log('Building added successfully');
        this.addSuccessful = true;
        form.reset();
        this.updateBuildings();
      });

  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.location = results[0].formatted_address;
          this.editInfo.location = this.location;
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
    this.editInfo.geoLocation = {longitude: this.lng, latitude: this.lat};

    this.marker = new google.maps.Marker({
      position: {lng, lat},
      animation: google.maps.Animation.BOUNCE
    });
    console.log(this.getAddress(lat, lng));

  }


  editBuilding( id: any) {
    this.editSuccessful = false;
    const building = this.buildings.find( x => id === x._id);
    console.log(building.geoLocation);
    this.editInfo.id = building._id;
    this.editInfo.name = building.name;
    this.editInfo.floors = building.floors;
    console.log(building);
    this.editInfo.geoLocation = {latitude: building.geoLocation.latitude, longitude: building.geoLocation.longitude};
    this.marker = new google.maps.Marker({
      position: {lng: this.editInfo.geoLocation.longitude, lat: this.editInfo.geoLocation.latitude},
      animation: google.maps.Animation.BOUNCE
    });
    this.editInfo.location = building.location;
    this.showEditForm = true;

  }

  deleteBuilding(id: number) {
    this.adminService.deleteBuilding(id)
      .subscribe( () => {
        console.log('Building deleted!');
        this.updateBuildings();
      });


  }

  updateBuildings() {
    this.buildings = [];
    this.buildingMarkers=[];
    this.buildingService.fetchMyBuildings(this.user._id)
      .subscribe( res2 => {
        res2.buildings.forEach( x => {
          this.buildings.push(x);
          this.buildingMarkers.push(new google.maps.Marker({
            position: {lng: x.geoLocation.longitude, lat: x.geoLocation.latitude},
            animation: google.maps.Animation.BOUNCE,
            title: x.name,
            clickable: false
          }));
        });
        this.dataSource = new MatTableDataSource(this.buildings);
        this.cdr.detectChanges();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.buildings);
      });

  }
  onSubmitEditForm(EditForm: NgForm) {
    this.adminService.editBuilding(this.editInfo, this.editInfo.id)
      .subscribe( () => {
        console.log('Building updated successfully!');
        this.updateBuildings();
        this.showEditForm = false;
        this.editSuccessful = true;
        EditForm.reset();
      });
  }

  addPersonnel(id: any) {
    this.showPersonnelForm=true;
this.personnelBuilding = id;
  }



  onSubmitPersonnel(personnelForm: NgForm) {
    const formData = {
      firstName: personnelForm.value.firstName,
      lastName: personnelForm.value.lastName,
      roles: ['personnel'],
      phoneNumber: personnelForm.value.phoneNumber,
      id: personnelForm.value.id,
      email: personnelForm.value.email,
      password: personnelForm.value.password
    };
    console.log(formData);
    this.buildingService.addPersonnel(formData, this.personnelBuilding)
        .subscribe( () => {
          console.log('Personnel added successfully');
          personnelForm.reset();
          this.addPersonnelSuccessful = true;
        });
  }
}

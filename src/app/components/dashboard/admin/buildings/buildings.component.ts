import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  locationAcquired = false;
  displayedColumns: string[] = ['name', 'buildingOwner', 'location', 'floors', 'actions'];
  dataSource: MatTableDataSource<{ name: string, buildingOwner: string, location: string, floors: number }>;
  buildings = [];
  menuItem = 1;
  buildingOwners = [];
  specifiedBuildingId = null;
  editSuccessful = false;
  addSuccessful = false;
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

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {
    this.adminService.fetchAllBuildings()
      .subscribe( res => {
        res.buildings.forEach(x => {
          let name;
          this.adminService.fetchUserNameById(x.buildingOwner)
            .subscribe( ans => {
              name = ans.user[0].firstName + ' ' + ans.user[0].lastName;
              this.buildings.push({id: x._id, name: x.name, buildingOwner: name, location: x.location, floors: x.floors, geoLocation: x.geoLocation});
              this.dataSource = new MatTableDataSource(this.buildings);
              this.cdr.detectChanges();
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
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
        this.addSuccessful = true;
        form.reset();
        this.updateBuildings();
      });

  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
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
    this.editSuccessful=false;
    const building = this.buildings.find( x => id === x.id);
    this.editInfo.id = building.id;
    this.editInfo.name = building.name;
    this.editInfo.floors = building.floors;
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
    this.buildings =[];
    this.adminService.fetchAllBuildings()
      .subscribe( res => {
        res.buildings.forEach(x => {
          let name;
          this.adminService.fetchUserNameById(x.buildingOwner)
            .subscribe( ans => {
              name = ans.user[0].firstName + ' ' + ans.user[0].lastName;
              // tslint:disable-next-line:max-line-length
              this.buildings.push({id: x._id, name: x.name, buildingOwner: name, location: x.location, floors: x.floors, geoLocation: x.geoLocation});
              this.dataSource = new MatTableDataSource(this.buildings);
              this.cdr.detectChanges();
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            });
        });
      });

  }
  onSubmitEditForm(EditForm: NgForm) {
    this.adminService.editBuilding(this.editInfo, this.editInfo.id)
      .subscribe( () => {
        console.log('Building updated successfully!');
        this.updateBuildings();
        this.showEditForm = false;
        EditForm.reset();
        this.editSuccessful = true;
      });
  }
}

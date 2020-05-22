import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../services/auth.service';
import {BusinessService} from '../../../../services/business.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-my-businesses',
  templateUrl: './my-businesses.component.html',
  styleUrls: ['./my-businesses.component.css']
})
export class MyBusinessesComponent implements OnInit {

  businesses = [];
  buildings = [];
  user = null;

  // tslint:disable-next-line:max-line-length
  menuItem = 1;
  showEditForm = false;
  editInfo: any;
  constructor(private adminService: AdminService,
              private authService: AuthService,
              private businessService: BusinessService) {
    const buildings = [];
    this.adminService.fetchAllBuildings()
      .subscribe( res => {
        res.buildings.forEach( x => {
          this.buildings.push(x);
          buildings.push(x);
        });
      });
    this.authService.getUser().subscribe( res => {
      this.user = res.user[0];
      this.businessService.fetchMyBusinesses(res.user[0]._id)
        .subscribe(data => {
          data.businesses.forEach( x => {
            const building = buildings.find( y => y._id === x.building );
            this.businesses.push({
              id: x._id,
              name: x.name,
              building: building.name,
              location: building.location,
              description: x.description,
              floorNo: x.floorNo,
              createdAt: x.created_at
            });
          });
        });
    });
  }

  ngOnInit(): void {
  }

  onSubmitEditForm(EditForm: NgForm) {
    this.adminService.editBusiness(EditForm.value, this.editInfo.id)
      .subscribe( () => {
        console.log('Business added successfully');
        this.updateBusinesses();
        EditForm.reset();
      });
  }

  editBusiness(id: any) {
    const business = this.businesses.find(x => x.id === id);
    this.editInfo = {
      description: business.description,
      id,
      floorNo: business.floorNo,
      name: business.name
    };
    this.showEditForm = true;
  }

  deleteBusiness(id: any) {
    this.adminService.deleteBusiness(id)
      .subscribe( res => {
        console.log('Business deleted!');
        this.updateBusinesses();
      });
  }

  onSubmit(form: NgForm) {
    const formData = {
      name: form.value.name,
      floorNo: form.value.floorNo,
      description: form.value.description,
      businessOwner: this.user._id,
      building: form.value.building,
    };
    this.adminService.addBusiness(formData)
      .subscribe(() => {
        console.log('Business added successfully!');
        this.updateBusinesses();
        form.reset();
      });
  }

    updateBusinesses() {
    this.businesses = [];
      this.businessService.fetchMyBusinesses(this.user._id)
        .subscribe(data => {
          data.businesses.forEach( x => {
            const building = this.buildings.find( y => y._id === x.building );
            this.businesses.push({
              id: x._id,
              name: x.name,
              building: building.name,
              location: building.location,
              description: x.description,
              floorNo: x.floorNo,
              createdAt: x.created_at
            });
          });
        });
    }
}

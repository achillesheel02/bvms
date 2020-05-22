import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {MatTableDataSource} from '@angular/material/table';
import {NgForm} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['name', 'businessOwner', 'building', 'floorNo', 'actions'];
  dataSource: MatTableDataSource<{ name: string, businessOwner: string, building: string, floorNo: number }>;
  businesses = [];
  menuItem = 1;
  businessOwners = [];
  buildings = [];
  editInfo: { id: number, name: string, description: string, floorNo: number} = {
    id: null,
    name: '',
    description: '',
    floorNo: null
  };
  showEditForm = false;

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {
    const buildings = [];
    const businessOwners = [];
    this.adminService.fetchAllBuildings()
      .subscribe( res => {
        res.buildings.forEach(x => {
          this.buildings.push(x);
          buildings.push(x);
        });
      });
    this.adminService.fetchUserByRole('businessOwner')
      .subscribe( res => {
        res.users.forEach(x => {
          this.businessOwners.push(x);
          businessOwners.push(x);
        });
      });
    console.log(buildings);
    console.log(businessOwners);
    this.adminService.fetchAllBusinesses()
      .subscribe( res => {
        console.log(res);
        res.businesses.forEach(x => {
          const businessOwner = businessOwners.find( y => y._id === x.businessOwner);
          const building = buildings.find( y => y._id === x.building);
          console.log(building);
          this.businesses.push({
            id: x._id,
            name: x.name,
            building: building.name,
            businessOwner: businessOwner.firstName + ' ' + businessOwner.lastName,
            floorNo: x.floorNo,
            description: x. description
          });
            });

        console.log(this.businesses);
        this.dataSource = new MatTableDataSource(this.businesses);
        this.cdr.detectChanges();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;


      });
  }

  ngOnInit(): void {


  }

  updateBusinesses() {
    this.businesses = [];
    this.adminService.fetchAllBusinesses()
      .subscribe( res => {
        console.log(res);
        res.businesses.forEach(x => {
          const businessOwner = this.businessOwners.find( y => y._id === x.businessOwner);
          const building = this.buildings.find( y => y._id === x.building);
          this.businesses.push({
            id: x._id,
            name: x.name,
            building: x.building,
            businessOwner: businessOwner.firstName + ' ' + businessOwner.lastName,
            floorNo: x.floorNo,
            description: x. description
          });
        });

        console.log(this.businesses);
        this.dataSource = new MatTableDataSource(this.businesses);
        this.cdr.detectChanges();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  }); }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editBusiness(id: any) {
    console.log(id);
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
    this.adminService.addBusiness(form.value)
      .subscribe( () => {
        console.log('Business added successfully!');
        this.updateBusinesses();
        form.reset();
      });

  }

  onSubmitEditForm(EditForm: NgForm) {
    console.log(EditForm.value);
    this.adminService.editBusiness(EditForm.value, this.editInfo.id)
      .subscribe( () => {
        console.log('Business added successfully');
        this.updateBusinesses();
        EditForm.reset();
      });

  }
}

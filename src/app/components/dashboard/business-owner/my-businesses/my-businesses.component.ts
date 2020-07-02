import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../services/auth.service';
import {BusinessService} from '../../../../services/business.service';
import {NgForm} from '@angular/forms';
import {VisitService} from '../../../../services/visit.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-my-businesses',
  templateUrl: './my-businesses.component.html',
  styleUrls: ['./my-businesses.component.css']
})
export class MyBusinessesComponent implements OnInit, AfterViewInit , OnDestroy{


  businesses = [];
  buildings = [];
  user = null;
  addSuccessful = false;
  editSuccessful = false;


  // tslint:disable-next-line:max-line-length
  menuItem = 1;
  visitsChart: am4charts.XYChart;
  @ViewChild('visitsChart') visitChart: ElementRef<HTMLElement>;

  showEditForm = false;
  editInfo: any;
  constructor(private adminService: AdminService,
              private authService: AuthService,
              private businessService: BusinessService,
              private visitService: VisitService,
              private zone: NgZone) {
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
            this.visitService.fetchPerBusiness(x._id)
              .subscribe( visits => {
                const building = buildings.find( y => y._id === x.building );
                this.businesses.push({
                  id: x._id,
                  name: x.name,
                  building: building.name,
                  location: building.location,
                  description: x.description,
                  floorNo: x.floorNo,
                  createdAt: x.created_at,
                  visits: visits.visits
                });
              });
          });
          console.log(this.businesses);
        });
    });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.authService.getUser().subscribe( res => {
        this.businessService.fetchMyBusinesses(res.user[0]._id)
          .subscribe(data => {
            this.visitService.fetchAllVisits()
              .subscribe( visitsData => {
                const businesses = [];
                const visits = visitsData.visits;
                data.businesses.forEach( x => {
                  const myVisits = visits.filter( y => y.businessVisiting === x._id);
                  console.log(myVisits);
                  businesses.push({
                    name: x.name,
                    createdAt: x.created_at,
                    visits: myVisits.length
                  });
                });
                const chart = am4core.create(this.visitChart.nativeElement, am4charts.XYChart);
                chart.data = businesses;
                console.log(chart.data);
                const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.dataFields.category = 'name';
                categoryAxis.renderer.minGridDistance = 15;
                categoryAxis.renderer.grid.template.location = 0.5;
                categoryAxis.renderer.grid.template.strokeDasharray = '1,3';
                categoryAxis.renderer.labels.template.rotation = -90;
                categoryAxis.renderer.labels.template.horizontalCenter = 'left';
                categoryAxis.renderer.labels.template.location = 0.5;
                categoryAxis.renderer.labels.template.adapter.add('dx', function(dx, target) {
                  return -target.maxRight / 2;
                });

                const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                valueAxis.renderer.ticks.template.disabled = true;
                valueAxis.renderer.axisFills.template.disabled = true;

                const series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.categoryX = 'name';
                series.dataFields.valueY = 'visits';
                series.tooltipText = '{valueY.value} visits';
                series.sequencedInterpolation = true;
                series.fillOpacity = 0;
                series.strokeOpacity = 1;
                series.columns.template.width = 0.01;
                series.tooltip.pointerOrientation = 'horizontal';

                const bullet = series.bullets.create(am4charts.CircleBullet);

                chart.cursor = new am4charts.XYCursor();


                console.log(chart);
                this.visitsChart = chart;
              });
          });
      });
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.visitsChart) {
        this.visitsChart.dispose();
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmitEditForm(EditForm: NgForm) {
    this.adminService.editBusiness(EditForm.value, this.editInfo.id)
      .subscribe( () => {
        console.log('Business added successfully');
        this.updateBusinesses();
        this.editSuccessful = true;
        EditForm.reset();
      });
  }

  editBusiness(id: any) {
    this.editSuccessful = false;
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
        this.addSuccessful = true;
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

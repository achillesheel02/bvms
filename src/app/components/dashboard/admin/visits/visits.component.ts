import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../services/auth.service';
import {BusinessService} from '../../../../services/business.service';
import {VisitService} from '../../../../services/visit.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['guest', 'admittingPersonnel', 'businessVisiting', 'timeIn' , 'timeOut' , 'checkedOut' , 'itemsCarried', 'actions'];
  dataSource: MatTableDataSource<{ admittingPersonnel: string, guest: string, businessVisiting: string, checkedOut: boolean , itemsCarried: string [], timeIn: Date, timeOut: Date }>;
  businesses = [];
  guests = [];
  visits = [];
  user = null;
  users = [];

  ScanShow = false;
  authError = false;
  qrCodeValue: any;
  value: any;
  startAuthentication = false;
  // tslint:disable-next-line:max-line-length
  authSuccess = false;
  secret = '';
  loginSuccess = false;
  checkOutId = null;
  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef, private authService: AuthService, private businessService: BusinessService,
              private visitService: VisitService) {
    this.authService.getUser()
      .subscribe( res => {
        this.visitService.fetchAllVisits()
          .subscribe(visits => {
            this.adminService.fetchUserByRole('guest')
              .subscribe(guest => {
                this.adminService.fetchAllBusinesses()
                  .subscribe(bus => {
                    this.adminService.fetchAllUsers()
                      .subscribe(res2 => {
                        visits.visits.forEach(x => {
                          const guestInfo = guest.users.find(y => y._id === x.guest);
                          const business = bus.businesses.find(y => y._id === x.businessVisiting);
                          const admittingPersonnel = res2.users.find(y => y._id === x.admittingPersonnel);
                          console.log(admittingPersonnel);
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
                        this.dataSource = new MatTableDataSource(this.visits);
                        this.cdr.detectChanges();
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                      });
                  });
              });
          });
      });

  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  checkOutVisitor(id: string) {
    this.ScanShow = true;
    this.checkOutId = id;
  }

  getUser($event: string) {
    console.log('User found!');
    this.ScanShow = false;
    this.loginSuccess = false;
    const id = $event.split('-')[0];
    this.startAuthentication = true;
    this.adminService.authenticate(id)
      .subscribe( res => {
        console.log(res);
        this.secret = res.secret;
      });
  }

  onSubmitAuthCode(authCodeform: NgForm) {
    this.adminService.completeAuthenticate({token: authCodeform.value.authCode, secret: this.secret})
      .subscribe( res => {
        if (res.status === null) {
          this.authError = true;
        } else
        {
          console.log(res.status);
          this.authError = false;
          this.authSuccess = true;
          this.startAuthentication = false;
          this.visitService.checkOut(this.checkOutId)
            .subscribe( () => {
              console.log('User Checked Out!');
              this.updateVisits();
              this.checkOutId = null;
            });

        }
      });
  }

  private updateVisits() {
    this.visits = [];
    this.authService.getUser()
      .subscribe(res => {
        console.log(res);
        const guests = [];
        const businesses = [];
        const users = [];
        this.user = res.user[0];
        this.adminService.fetchUserByRole('guest')
          .subscribe(guest => {
            guest.users.forEach(x => {
              this.guests.push(x);
              guests.push(x);
            });
          });

        this.adminService.fetchAllBusinesses()
          .subscribe(business => {
            business.businesses.forEach(x => {
              this.businesses.push(x);
              businesses.push(x);
            });
          });
        this.adminService.fetchAllUsers()
          .subscribe(res2 => {
            res2.users.forEach(x => {
              this.users.push(x);
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

            this.dataSource = new MatTableDataSource(this.visits);
            this.cdr.detectChanges();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
      });
  }}

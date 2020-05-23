import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../services/auth.service';
import {BuildingService} from '../../../../services/building.service';
import {PersonnelService} from '../../../../services/personnel.service';
import {VisitService} from '../../../../services/visit.service';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent implements OnInit {
  guests = [];
  visitor = null;
  user = null;
  businesses = [];
  generateQRCode = false;
  elementType = 'url';
  authError = false;
  qrCodeValue: any;
  ScanShow = true;
  value: any;
  startAuthentication = false;
  // tslint:disable-next-line:max-line-length
  authSuccess = false;
  secret = '';
  loginSuccess = false;

  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef, private authService: AuthService, private personnelService: PersonnelService,
              private visitService: VisitService) {
    this.authService.getUser()
      .subscribe( res => {
        this.user = res.user[0];
        this.adminService.fetchUserByRole('guest')
          .subscribe( res2 => {
            res2.users.forEach( x => {
              this.guests.push(x);
            });
          });
        console.log(this.user);
        this.personnelService.fetchMyBusinessesGuarding(res.user[0]._id)
          .subscribe( res3 => {
            res3.businesses[0].forEach( x => {
              this.businesses.push(x);
            });
          });

      });
  }

  ngOnInit(): void {
  }

  onSubmitNewVisitor(newVisitorForm: NgForm) {
    this.qrCodeValue = newVisitorForm.value.id.toString() + '-' + newVisitorForm.value.firstName;
    this.generateQRCode = true;
    this.generateCodeAndSubmit(newVisitorForm);
    newVisitorForm.reset();
  }
  generateCodeAndSubmit(form) {
    const formData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      id: form.value.id,
      password: form.value.password,
      phoneNumber: form.value.phoneNumber,
      qrCode: undefined

    };
    setTimeout(() => {
      formData.qrCode = document.getElementsByTagName('img')[0].src;

    }, 0);

    this.adminService.addGuest(formData)
      .subscribe( res => {
        console.log('Guest added successfully');
        this.guests = [];
        this.adminService.fetchUserByRole('guest')
          .subscribe( res2 => {
            res2.users.forEach( x => {
              this.guests.push(x);
            });
          });
      });
    console.log(formData);

  }

  onSubmit(returningVisitorform: NgForm) {
    const formData = {
      admittingPersonnel: this.user._id,
      guest: this.visitor._id,
      businessVisiting: returningVisitorform.value.businessVisiting,
      itemsCarried: returningVisitorform.value.itemsCarried.split(',')
    };
    console.log(formData);
    this.visitService.addVisit(formData)
      .subscribe(() => {
        this.loginSuccess = true;
        this.generateQRCode = false;
        this.authError = false;
        this.ScanShow = true;
        this.startAuthentication = false;
        // tslint:disable-next-line:max-line-length
        this.authSuccess = false;
        console.log('Visit added!');
      });
  }

  getUser($event: string) {
    console.log('User found!');
    this.ScanShow = false;
    this.loginSuccess = false;
    const id = $event.split('-')[0];
    console.log(id);
    console.log(this.guests);
    this.visitor = this.guests.find( x => x.id.toString() === id);
    console.log(this.visitor);
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

        }
      });
  }
}

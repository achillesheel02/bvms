import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../services/auth.service';
import {BuildingService} from '../../../../services/building.service';
import {PersonnelService} from '../../../../services/personnel.service';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent implements OnInit {
  guests = [];
  user = null;
  businesses = [];
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef, private authService: AuthService, private personnelService: PersonnelService) {
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
    console.log(newVisitorForm.value);
  }

  onSubmit(returningVisitorform: NgForm) {
    const formData = {
      guest: returningVisitorform.value.guest,
      businessVisiting: returningVisitorform.value.businessVisiting,
      itemsCarried: returningVisitorform.value.itemsCarried.split(',')
    };
    console.log(formData);
  }
}

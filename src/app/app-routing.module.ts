import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent} from './components/dashboard/admin/admin.component';
import {AnalyticsComponent} from './components/dashboard/admin/analytics/analytics.component';
import {UsersComponent} from './components/dashboard/admin/users/users.component';
import {VisitsComponent} from './components/dashboard/admin/visits/visits.component';
import {BusinessesComponent} from './components/dashboard/admin/businesses/businesses.component';
import {BuildingsComponent} from './components/dashboard/admin/buildings/buildings.component';
import {SettingsComponent} from './components/dashboard/admin/settings/settings.component';
import {VisitsSummaryComponent} from './components/dashboard/personnel/visits-summary/visits-summary.component';
import {AddVisitorComponent} from './components/dashboard/personnel/add-visitor/add-visitor.component';
import {PersonnelSettingsComponent} from './components/dashboard/personnel/personnel-settings/personnel-settings.component';


const routes: Routes =  [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BusinessOwnerComponent } from './components/dashboard/business-owner/business-owner.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RolePipe } from './pipes/role.pipe';
import { BuildingOwnerComponent } from './components/dashboard/building-owner/building-owner.component';
import { PersonnelComponent } from './components/dashboard/personnel/personnel.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { AnalyticsComponent } from './components/dashboard/admin/analytics/analytics.component';
import { UsersComponent } from './components/dashboard/admin/users/users.component';
import { BusinessesComponent } from './components/dashboard/admin/businesses/businesses.component';
import { BuildingsComponent } from './components/dashboard/admin/buildings/buildings.component';
import { SettingsComponent } from './components/dashboard/admin/settings/settings.component';
import { VisitsComponent } from './components/dashboard/admin/visits/visits.component';
import { VisitsSummaryComponent } from './components/dashboard/personnel/visits-summary/visits-summary.component';
import { AddVisitorComponent } from './components/dashboard/personnel/add-visitor/add-visitor.component';
import { PersonnelSettingsComponent } from './components/dashboard/personnel/personnel-settings/personnel-settings.component';
import { RouterComponent } from './components/router/router.component';
import { MyBusinessesComponent } from './components/dashboard/business-owner/my-businesses/my-businesses.component';
import { BusinessAnalyticsComponent } from './components/dashboard/business-owner/business-analytics/business-analytics.component';
import { BusinessOwnerSettingsComponent } from './components/dashboard/business-owner/business-owner-settings/business-owner-settings.component';
import { MyBuildingsComponent } from './components/dashboard/building-owner/my-buildings/my-buildings.component';
import { BuildingAnalyticsComponent } from './components/dashboard/building-owner/building-analytics/building-analytics.component';
import { BuildingBusinessesResidingComponent } from './components/dashboard/building-owner/building-businesses-residing/building-businesses-residing.component';
import { BuildingOwnerSettingsComponent } from './components/dashboard/building-owner/building-owner-settings/building-owner-settings.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkTableModule} from '@angular/cdk/table';
import {GoogleMapsModule} from '@angular/google-maps';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PageNotFoundComponent,
    AdminComponent,
    DashboardComponent,
    BusinessOwnerComponent,
    RolePipe,
    BuildingOwnerComponent,
    PersonnelComponent,
    AnalyticsComponent,
    UsersComponent,
    BusinessesComponent,
    BuildingsComponent,
    SettingsComponent,
    VisitsComponent,
    VisitsSummaryComponent,
    AddVisitorComponent,
    PersonnelSettingsComponent,
    RouterComponent,
    MyBusinessesComponent,
    BusinessAnalyticsComponent,
    BusinessOwnerSettingsComponent,
    MyBuildingsComponent,
    BuildingAnalyticsComponent,
    BuildingBusinessesResidingComponent,
    BuildingOwnerSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CdkTableModule,
    GoogleMapsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  private url = environment.serverUrl;

  fetchMyBuildings(id){
    return this.http.get<{message: string, buildings: any}>(this.url + 'api/building/fetchByOwner/' + id);
  }

  fetchMyBusinesses(id){
    return this.http.get<{message: string, businesses: any}>(this.url + 'api/business/fetchByBuilding/' + id);
  }

  fetchByBusinesses(id){
    return this.http.get<{message: string, building: any}>(this.url + 'api/building/fetch/' + id);
  }

  addPersonnel(personnel, building){
    return this.http.post(this.url + 'api/user/addPersonnel/' + building, personnel);
  }

  fetchAllPersonnel(buildingOwner){
    return this.http.get<{message: string, buildings: any}>(this.url + 'api/building/fetchPersonnel/' + buildingOwner);
  }
}

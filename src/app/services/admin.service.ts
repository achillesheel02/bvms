import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = environment.serverUrl;

  constructor(private http: HttpClient) { }

  fetchAllUsers(){
    return this.http.get<{message: string, users: any}>(this.url + 'api/user/all');
  }

  addUser(user){
    return this.http.post(this.url + 'api/user/create', user);
  }

  addBusiness(business){
    return this.http.post(this.url + 'api/business/add', business);
  }
  editUser(user, id){
    return this.http.patch(this.url + 'api/user/edit/' + id, user);
  }
  deleteUser(id){
    return this.http.delete(this.url + 'api/user/delete/' + id);
  }

  addBuilding(building){
    return this.http.post(this.url + 'api/building/add', building);
  }

  editBuilding(building, id){
    return this.http.patch(this.url + 'api/building/edit/' + id, building);
  }

  editBusiness(business, id){
    return this.http.patch(this.url + 'api/business/edit/' + id, business);
  }

  deleteBusiness(id){
    return this.http.delete(this.url + 'api/business/delete/' + id);
  }

  deleteBuilding(id){
    return this.http.delete(this.url + 'api/building/delete/' + id);
  }


  fetchAllBuildings(){
    return this.http.get<{message: string, buildings: any}>(this.url + 'api/building/all');
  }

  fetchAllBusinesses(){
    return this.http.get<{message: string, businesses: any}>(this.url + 'api/business/all');
  }

  fetchUserByRole(role){
    return this.http.get<{message: string, users: any}>(this.url + 'api/user/role/' + role);
  }

  fetchUserNameById(id){
    return this.http.get<{message: string, user: any}>(this.url + 'api/user/fetchByDbId/' + id);
  }

  fetchUser(id){
    return this.http.get<{message: string, user: any}>(this.url + 'api/user/fetch/' + id);
  }

  fetchBuildingById(id){
    return this.http.get<{message: string, building: any}>(this.url + 'api/building/fetch/' + id);
  }
}

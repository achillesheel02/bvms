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

  addBuilding(building){
    return this.http.post(this.url + 'api/building/add', building);
  }

  fetchAllBuildings(){
    return this.http.get<{message: string, buildings: any}>(this.url + 'api/building/all');
  }

  fetchUserByRole(role){
    return this.http.get<{message: string, users: any}>(this.url + 'api/user/role/' + role);
  }

  fetchUserNameById(id){
    return this.http.get<{message: string, user: any}>(this.url + 'api/user/fetchByDbId/' + id);
  }
}

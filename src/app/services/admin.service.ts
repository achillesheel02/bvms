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
}

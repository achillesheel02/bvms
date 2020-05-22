import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) {
  }

  private url = environment.serverUrl;

  fetchMyBusinesses(id) {
    return this.http.get<{ message: string, businesses: any }>(this.url + 'api/business/fetchByOwner/' + id);
  }
}

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private url = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  fetchAllVisits() {
    return this.http.get<{ message: string, users: any }>(this.url + 'api/visit/all');
  }

  addVisit(payload) {
    return this.http.post(this.url + 'api/visit/add', payload);
  }
}
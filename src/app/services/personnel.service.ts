import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private http: HttpClient) {
  }

  private url = environment.serverUrl;

  fetchMyBusinessesGuarding(id) {
    return this.http.get<{ message: string, businesses: any }>(this.url + 'api/business/fetchByPersonnelGuarding/' + id);
  }
}

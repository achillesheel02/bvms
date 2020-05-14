import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = environment.serverUrl;
  private token: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private timer: any;
  private user: any;


  constructor(private http: HttpClient,
              private router: Router) { }


  login(id: number, password: string) {
    const authData = {id, password};
    this.http.post<{token: string, userId: string}>(this.url + 'api/user/login', authData)
      .subscribe(response => {
        this.token = response.token;
        this.setAuthTimer(3600000);
        this.userId = response.userId;
        this.getUser();
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + 3600000);
        this.saveAuthData(this.token, expirationDate, this.userId);
        // #TODO change router navigation after login
        this.router.navigate(['main']);
      }, error => {
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) { return; }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    console.log(authInfo);
    if (expiresIn > 0) {
      this.token = authInfo._token;
      this.setAuthTimer(expiresIn);
      this.isAuthenticated = true;
      this.user = authInfo._user;
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    this.token = null;
    clearTimeout(this.timer);
    this.isAuthenticated = false;
    this.userId = null;
    this.user = null;
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.http.get<{ message: string; userInfo: any }>(this.url + 'api/user/fetch/' + this.user)
      .subscribe( res => {
          this.user = res.userInfo;
        }
      );
  }

  isAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private saveAuthData(token: string, expirationDate: Date, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', user);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');

  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = localStorage.getItem('user');

    if (!token || !expirationDate) { return; }
    return {
      _token: token,
      expirationDate: new Date(expirationDate),
      _user: user,
    };
  }

}

import { Injectable } from '@angular/core';
import { Config } from './config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the DeliveryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class UserService {
  serviceRootUrl: string;

  private readonly REGISTER_URL = '/register';  // post
  private readonly USER_URL = '/users'; // +username, get
  private readonly UPDATE_USER_URL = '/users'; // +email/reset
  private readonly AUTH_URL = '/auth'; // post
  private readonly FORGOT_PASSWORD = '/mails'; // post
  private readonly ADDRESS_URL = '/users/address'; // +userId
  private readonly UPLOAD_PICTURE_URL = '/users/upload'; // +userId 

  constructor(private http: Http, public config: Config) {
    this.serviceRootUrl = config.serverUrl;
  }

  registerUser(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.REGISTER_URL;
    return this.http.post(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  uploadPicture(userId: number, authToken: any, image: any): Observable<any> {
    const headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', authToken);
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.UPLOAD_PICTURE_URL + `/${userId}`;
    return this.http.post(requestUrl, image, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getUserDetails(userId: number, authToken: any): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.USER_URL + `/${userId}`;
    return this.http.get(requestUrl, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  updateUser(user: any, authToken: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.UPDATE_USER_URL + `/${user.email}/reset`;
    return this.http.put(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  authenticate(email: string, password: any): Observable<any> {
    const credentials = {
      username: email,
      password: password
    };
    const body = JSON.stringify(credentials);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.AUTH_URL;
    return this.http.post(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  forgotPassword(email: string): Observable<any> {
    const reqData = {
      PASSWORD_RESET: 1,
      email: email,
      subject: 1
    };
    const body = JSON.stringify(reqData);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.FORGOT_PASSWORD;
    return this.http.post(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getAddressList(userId: number, authToken: any): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.ADDRESS_URL + `/${userId}`;
    return this.http.get(requestUrl, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Observable.throw(error.json() || 'Server Error');
  }
}

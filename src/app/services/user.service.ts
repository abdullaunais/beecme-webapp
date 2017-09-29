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

  http: Http;
  headers: Headers;
  options: RequestOptions;

  serviceRootUrl: string;

  REGISTER_URL = "/register";  // post
  GET_USER_URL = "/users"; // +username, get
  UPDATE_USER_URL = "/users"; // +email/reset
  AUTHENTICATE_LOGIN = "/auth"; // post
  FORGOT_PASSWORD = "/mails"; // post
  ADDRESS_URL = "/users/address"; //+userId
  UPLOAD_PICTURE = "/users/upload"; //+userId 

  constructor(public httpService: Http, public config: Config) {
    this.http = httpService;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    this.serviceRootUrl = config.serverUrl + "/delivery";
  }

  registerUser(user: any): Observable<any> {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.REGISTER_URL;
    return this.http.post(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  uploadPicture(userId: number, authToken: any, image: any): Observable<any> {
    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', authToken);
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.UPLOAD_PICTURE + "/" + userId
    return this.http.post(requestUrl, image, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getUserDetails(userId: number, authToken: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.GET_USER_URL + "/" + userId;
    return this.http.get(requestUrl, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  updateUser(user: any, authToken: any): Observable<any> {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.UPDATE_USER_URL + "/" + user.email + "/reset";
    return this.http.put(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  authenticate(email: string, password: any): Observable<any> {
    let credentials = {
      username: email,
      password: password
    };
    let body = JSON.stringify(credentials);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.AUTHENTICATE_LOGIN;
    return this.http.post(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  forgotPassword(email: string): Observable<any> {
    let request = {
      PASSWORD_RESET: 1,
      email: email,
      subject: 1
    };
    let body = JSON.stringify(request);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.FORGOT_PASSWORD;
    return this.http.post(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getAddressList(userId: number, authToken: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.ADDRESS_URL + "/" + userId;
    return this.http.get(requestUrl, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Observable.throw(error.json() || 'Server Error');
  }
}

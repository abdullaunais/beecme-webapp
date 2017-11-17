import { Injectable } from '@angular/core';
import { Config } from './config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Address } from '../beans';
import { ObjectStorage } from '../utilities/object-storage';
import { Constant } from './constant';

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

  constructor(private http: Http,
    public config: Config,
    private storage: ObjectStorage) {
    this.serviceRootUrl = config.getServerUrl();
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

  authenticate(email: string, password: any): Observable<Response> {
    const credentials = {
      username: email,
      password: password
    };
    const body = JSON.stringify(credentials);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.AUTH_URL;
    return this.http.post(requestUrl, body, options);
    // .map((res) => this.extractData(res))
    // .catch((err) => this.handleError(err));
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

  addAddress(address: Address): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    headers.append('Authorization', this.storage.get(Constant.USER_OBJECT).authToken);
    console.log(`Authorization token is ${JSON.stringify(this.storage.get(Constant.USER_OBJECT))}`);
    const url = this.serviceRootUrl + '/users/address/' + address.userId;
    console.log(`URL ADD NEW ADDRESS:  ${url} and new address is ${JSON.stringify(address)}`);
    return this.http.post(url, JSON.stringify(address), options);
  }

  deleteAddress(addressId: number): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const authToken = this.storage.get(Constant.AUTHENTICATION_TOKEN);
    console.log(`authToken:  ${authToken}`);
    const options = new RequestOptions({ headers: headers });
    headers.append('Authorization', authToken);
    console.log(`Authorization token is ${JSON.stringify(this.storage.get(Constant.USER_OBJECT))}`);
    const url = this.serviceRootUrl + '/users/address/' + addressId;
    console.log(`URL DELETE ADDRESS:  ${url} of ID ${addressId}`);
    return this.http.delete(url, options);
  }

  getAddresses(userId: number): Observable<Address[]> {
    // create header for the http call
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const url = this.serviceRootUrl + '/users/address/' + userId;
    console.log(`url for addresses for user :  ${url}`);
    return this.http.get(url, options)
      .map(res => (res.json()));
  }
}

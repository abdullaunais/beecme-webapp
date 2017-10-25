import { Injectable } from '@angular/core';
import { Config } from './config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { LocationDetails, CartReq } from "../beans";
import { ObjectStorage } from "../utilities/object-storage";

/*
  Generated class for the DeliveryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class DeliveryService {
  headers: Headers;
  options: RequestOptions;

  serviceRootUrl: string;

  private readonly LOCATION_URL = '/locations';
  private readonly SHOP_URL = '/shops';
  private readonly CATEGORY_URL = '/categories';
  private readonly ITEM_URL = '/items';
  private readonly ITEM_SHOP_URL = '/shopitems';
  private readonly SCHEDULE_URL = '/schedules';
  private readonly ORDER_URL = '/carts';
  private readonly REVIEW_URL = '/reviews';
  private readonly DASHBOARD_COUNTS_URL = '/dashboard/counts';
  private readonly SEARCH_URL = '/dashboard/search';

  constructor(private http: Http,
    public config: Config,
    private storage: ObjectStorage) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    this.serviceRootUrl = config.getServerUrl();
  }

  getLocation(type: number, value: number, start: number, offset: number): Observable<any> {
    const queryParams = {
      type: type,
      value: value,
      start: start,
      offset: offset
    };
    const requestUrl: string = this.serviceRootUrl + this.LOCATION_URL + this.encodeQueryData(queryParams);
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getLocationDetails(cityId: number): Observable<LocationDetails> {
    const requestUrl: string = this.serviceRootUrl + this.LOCATION_URL + '/' + cityId;
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getDashboardCounts(cityId: number) {
    const requestUrl: string = this.serviceRootUrl + this.DASHBOARD_COUNTS_URL + `/${cityId}`;
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getShops(cityId: number, categoryId: number, start: number, offset: number): Observable<any> {
    const queryParams = {
      type: 71,
      value: [categoryId, cityId],
      start: start,
      offset: offset
    };
    const requestUrl: string = this.serviceRootUrl + this.SHOP_URL + this.encodeQueryData(queryParams);
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getShopById(cityId: number, shopId: number): Observable<any> {
    const requestUrl: string = this.serviceRootUrl + this.SHOP_URL + `/${cityId}/${shopId}`;
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getCategories(cityId: number): Observable<any> {
    const requestUrl: string = this.serviceRootUrl + this.CATEGORY_URL + `/${cityId}`;
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getItemByShop(categoryId:number, shopId: number, start: number, offset: number): Observable<any> {
    const queryParams = {
      type : 150,
      value : [categoryId, shopId],
      start: start,
      offset: offset
    };
    const requestUrl: string = this.serviceRootUrl + this.ITEM_SHOP_URL + this.encodeQueryData(queryParams);
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getItemById(shopId: number, itemId: number): Observable<any> {
    const requestUrl: string = this.serviceRootUrl + this.ITEM_SHOP_URL + `/${shopId}/${itemId}`;
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  // findItem(itemCode: number): Observable<any> {
  //   const requestUrl: string = this.serviceRootUrl + this.ITEM_URL + `/${itemCode}`;
  //   return this.http.get(requestUrl, this.options)
  //     .map((res) => this.extractData(res))
  //     .catch((err) => this.handleError(err));
  // }

  searchItems(cityId: number, keyword: string, start: number, offset: number): Observable<any> {
    const queryParams = {
      key: keyword,
      start: start,
      offset: offset
    };
    const requestUrl: string = this.serviceRootUrl + this.SEARCH_URL + `/${cityId}` + this.encodeQueryData(queryParams);
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getItemByCategory(category: number, start: number, offset: number): Observable<any> {
    const queryParams = {
      type: 11,
      value: category,
      start: start,
      offset: offset
    };
    const requestUrl: string = this.serviceRootUrl + this.ITEM_URL + this.encodeQueryData(queryParams);
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getSchedules(cityId: number): Observable<any> {
    const queryParams = {
      city: cityId
    };
    const requestUrl: string = this.serviceRootUrl + this.SCHEDULE_URL + this.encodeQueryData(queryParams);
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  getOrders(userId: number, start: number, offset: number): Observable<any> {
    const queryParams = {
      type: 32,
      value: userId,
      start: start,
      offset: offset
    };
    const requestUrl: string = this.serviceRootUrl + this.ORDER_URL + this.encodeQueryData(queryParams);
    return this.http.get(requestUrl, this.options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  addOrder(order: any, authToken: any): Observable<any> {
    const body = JSON.stringify(order);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.ORDER_URL;
    return this.http.post(requestUrl, body, options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  sendReview(review: any, authToken: any): Observable<any> {
    const body = JSON.stringify(review, authToken);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken);
    const options = new RequestOptions({ headers: headers });

    const requestUrl: string = this.serviceRootUrl + this.REVIEW_URL;
    return this.http.post(requestUrl, body, options)
      .map((res) => this.extractData(res))
      .catch((err) => this.handleError(err));
  }

  private encodeQueryData(data: any): string {
    return '?' + Object.keys(data).map((key) => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Observable.throw(error.json() || 'Server Error');
  }

  saveCart(cartReq: CartReq): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNTZ0ZXN0aW5nIiwiYXVkaWVuY2UiOiJtb2JpbGUiLCJjcmVhdGVkIjoxNDg3OTI1MTk5Mzk2LCJleHAiOjE0ODg1Mjk5OTl9.y9Taa5yaufPdYKkise69wR14N51omlmxwz-2gGXVOqM');
    console.log(`Authorization token = ${(this.storage.get('user.authToken'))}`); 
    //console.log('Authorization token = '+this.sharedService.user.authToken)
    headers.append('Authorization', this.storage.get('user.authToken'));
    /*, 'Origin' : 'http://localhost:8080/',
                              methods: ['GET', 'PUT', 'POST'],
                            allowedHeaders: ['Content-Type', 'Authorization']  });*/

    let options = new RequestOptions({ headers: headers });

    const url = this.serviceRootUrl + '/carts';
    console.log(`Saving the order ---> ${JSON.stringify(cartReq)}`);
    return this.http.post(url, JSON.stringify(cartReq), options)
  }
}

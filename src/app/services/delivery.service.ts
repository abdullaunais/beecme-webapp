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
export class DeliveryService {

  http: Http;
  headers: Headers;
  options: RequestOptions;

  serviceRootUrl: string;

  LOCATION_URL = "/locations";
  SHOPS_URL = "/shops";
  CATEGORIES_URL = "/categories";
  ITEM_URL = "/items";
  ITEM_SHOP_URL = "/itemshop";
  SCHEDULES_URL = "/schedules";
  ORDER_URL = "/carts";
  REVIEW_URL = "/reviews"

  constructor(public httpService: Http, public config: Config) {
    this.http = httpService;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    this.serviceRootUrl = config.serverUrl + "/delivery";
  }

  getLocation(type: number, value: number, start: number, offset: number): Observable<any> {
    let queryParams = "?type=" + type + "&value=" + value + "&start=" + start + "&offset=" + offset;
    let requestUrl: string = this.serviceRootUrl + this.LOCATION_URL + queryParams;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getShops(categoryId: number, start: number, offset: number): Observable<any> {
    let queryParams = "?type=71&value=" + categoryId + "&start=" + start + "&offset=" + offset;
    let requestUrl: string = this.serviceRootUrl + this.SHOPS_URL + queryParams;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getShopById(shopId: number): Observable<any> {
    let requestUrl: string = this.serviceRootUrl + this.SHOPS_URL + "/" + shopId;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getCategories(cityId: number): Observable<any> {
    let requestUrl: string = this.serviceRootUrl + this.CATEGORIES_URL + "/" + cityId;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getItemByShop(shopId: number, start: number, offset: number): Observable<any> {
    let queryParams = "?type=17&value=" + shopId + "&start=" + start + "&offset=" + offset;
    let requestUrl: string = this.serviceRootUrl + this.ITEM_URL + queryParams;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getItemById(shopId: number, itemId: number): Observable<any> {
    let requestUrl: string = this.serviceRootUrl + this.ITEM_SHOP_URL + "/" + shopId + "/" + itemId;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  findItem(itemCode: number): Observable<any> {
    let requestUrl: string = this.serviceRootUrl + this.ITEM_URL + "/" + itemCode;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getItemByCategory(category: number, start: number, offset: number): Observable<any> {
    let queryParams = "?type=11&value=" + category + "&start=" + start + "&offset=" + offset;
    let requestUrl: string = this.serviceRootUrl + this.ITEM_URL + queryParams;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getSchedules(cityId: number): Observable<any> {
    let requestUrl: string = this.serviceRootUrl + this.SCHEDULES_URL + "?city=" + cityId;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  getOrders(userId: number, start: number, offset: number): Observable<any> {
    let queryParams = "?type=32&value=" + userId + "&start=" + start + "&offset=" + offset;
    let requestUrl: string = this.serviceRootUrl + this.ORDER_URL + queryParams;
    return this.http.get(requestUrl, this.options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  addOrder(order: any, authToken: any): Observable<any> {
    let body = JSON.stringify(order);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken)
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.ORDER_URL;
    return this.http.post(requestUrl, body, options)
    .map((res) => this.extractData(res))
    .catch((err) => this.handleError(err));
  }

  sendReview(review: any, authToken: any): Observable<any> {
    let body = JSON.stringify(review, authToken);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', authToken)
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.REVIEW_URL;
    return this.http.post(requestUrl, body, options)
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
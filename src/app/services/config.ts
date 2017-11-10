import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Config provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Config {
  private readonly serverUrl: string = `http://beecme.com/delivery`;
  //  private readonly serverUrl: string = `http://localhost:8080/delivery`;
  constructor() {
  
  }
  getServerUrl() {
    return this.serverUrl;
  }
}

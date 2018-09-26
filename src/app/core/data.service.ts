import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatData } from './stat-data';
import { Observable } from 'rxjs';
import { DataConfig } from './data-config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getdata(parentclass: number): Observable<StatData[]> {
    if (parentclass == 1) {
      return this.http.get<StatData[]>('assets/data/shieerajildorson.json');
    }
    else {
      return this.http.get<StatData[]>('assets/data/ajilhaigch.json');
    }
  }
  getconfig(): Observable<DataConfig[]> {
    return this.http.get<DataConfig[]>('assets/data/DataConfig.json');
  }
  calcCPercentData(data: any[], datakey: any): any[] {
    let max = Math.max.apply(Math, data.map(function (o) { return o[datakey]; }))
    data.forEach(d => {
      d.cpercent = d[datakey] / max;
    });
    return data
  }
  sortDataById(data: any[], datakey: any): any[] {
    data.sort((n1, n2) => {
      if (n1.id > n2.id) {
        return 1;
      }

      if (n1.id < n2.id) {
        return -1;
      }
      return 0;
    });
    return data;
  }
}

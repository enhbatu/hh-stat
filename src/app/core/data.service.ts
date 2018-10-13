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
  groupBy(dataconfig: any[], data: any[], parentclass: number, mainclass: number, aimagid: number): any[][] {
    let groupByData: any[][] = [];
    groupByData[0] = [];
    groupByData[1] = [];
    for (var i = 1; i < dataconfig.length; i++) {
      if (dataconfig[i].parentclass == parentclass && dataconfig[i].mainclass == mainclass) {
        groupByData[0].push(dataconfig[i].Name);
        let total: number = 0;
        if (aimagid == 0) {
          for (var j = 0; j < data.length; j++) {
            total = total + data[j][dataconfig[i].dun];
          }
          groupByData[1].push({
            id: dataconfig[i].id,
            y: total
          });
        }
      }
    }
    return groupByData;
  }
  groupBySex(dataconfig: any[], data: any[], parentclass: number, mainclass: number, aimagid: number): any[] {
    let groupByData: any[] = [];
    let total: number = 0;
    let female: number = 0;
    for (var i = 0; i < dataconfig.length; i++) {
      if (dataconfig[i].parentclass == parentclass && dataconfig[i].mainclass == mainclass) {
        if (aimagid == 0) {
          for (var j = 0; j < data.length; j++) {
            total = total + data[j][dataconfig[i].dun];
            female = female + data[j][dataconfig[i].dun + "_female"];
          }
        }
      }
    }
    groupByData.push({
      id: 'male',
      dun: total - female
    });
    groupByData.push({
      id: 'female',
      dun: female
    });
    return groupByData;
  }
}

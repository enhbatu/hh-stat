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
}

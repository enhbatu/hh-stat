import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aimags } from './aimags';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AimagService {
  constructor(private http: HttpClient) { }
  getdata(): Observable<Aimags[]> {
    return this.http.get<Aimags[]>('assets/data/Aimags.json');
  }
}

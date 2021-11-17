import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Insurance } from '../models/insurance';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/insurance';
  

  get(){
    return this.http.get<any>(this.baseUrl).pipe(map((res:any)=>{
      return res;
      }));
  }

  // get(id: string): Observable<Insurance> {
  //   return this.http.get<any>(this.baseUrl + '/' + id);
  // }

  getInsuranceOnId(productId:number){
    return this.http.get<any>(this.baseUrl + '/' + productId).pipe(map((res:any)=>{
      return res;
      }));
  }

  post(data:any){
    return this.http.post(this.baseUrl, data).pipe(map((res:any)=>{
      return res;
      }));
  }
  delete(id:number){
    return this.http.delete<any>(this.baseUrl + '/' + id).pipe(map((res:any)=>{
      return res;
      }));
  }

  update(data:any,id: number){
    return this.http.put<any>(this.baseUrl + '/' + id, data).pipe(map((res:any)=>{
      return res;
      })); 
  }

  register(data:any){
    return this.http.post(this.baseUrl + '/register', data).pipe(map((res:any)=>{
      return res;
      }));
  }
  


}

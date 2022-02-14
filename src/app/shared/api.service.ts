import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  
  postEmployee(data: any){
    return this.http.post<any>('http://localhost:3000/posts/', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //cargar datos
  public get(url: string){
    return this.http.get(url);
  }

 /* public put( id: number, data: any={}){
    return this.http.put( id, data);
  }*/
  updateEmployee(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/posts/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id: number){
    return this.http.delete<any>('http://localhost:3000/posts/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

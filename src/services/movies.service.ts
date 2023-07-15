import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  readonly BaseURL='https://localhost:44311/api/Movies/'
  constructor(private http:HttpClient) { }

  getAllMovies():Observable<any[]>{
    return this.http.get<any>(this.BaseURL+'all');
  }
  getMovieByName(val:any):Observable<any[]>{
    return this.http.get<any>(this.BaseURL+'search/'+val);
  }
  deleteMovie(val1:any,val2:any){
    return this.http.delete(this.BaseURL+val1+'/delete/'+val2);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BaseURL='https://localhost:44319/api/Account/'
  constructor(private http:HttpClient) { }

  isAdmin=false;
  public username:any;
  public status(){
    if(localStorage.getItem('token')!=null){
      this.username=localStorage.getItem('username');
      const token=localStorage.getItem('token');
      if(token){
          const decodeToken:any = jwtDecode(token);
          this.isAdmin=decodeToken.role.includes('Admin');
      }
      return true;
    }
    else{
      return false;
    }
  }

  login(formData:any){
    return this.http.post(this.BaseURL+'login',formData);
  }

  register(formData:any){
    return this.http.post(this.BaseURL+'Register',formData);
  }

  forgotPassword(formData:any){
    return this.http.put(this.BaseURL+'ForgotPassword',formData);
  }

}

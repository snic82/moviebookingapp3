import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel={
    loginId:'',
    password:''
  }
  


  constructor(public service:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/movies');
    }
    
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).
    subscribe(
    (res:any)=>{
        localStorage.setItem('token',res.jwtToken);
        localStorage.setItem('username',res.loginId);
        this.router.navigateByUrl('/movies')
    },
      err=>{
        if(err.status == 400){
          console.log(err);
           this.toastr.error(err.error);
        }  
      }
    );
  }
  

}


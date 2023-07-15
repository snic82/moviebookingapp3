import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  formModel={
    loginId:'',
    newPassword:'',
    confirmNewPassword:''
  }

  constructor(public service:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/movies');
    }
  }
  onSubmit(form:NgForm){
    this.service.forgotPassword(form.value).
    subscribe(
      (res)=>{
        console.log(res);
    },
      err=>{ 
        if(err.status == 400){
           if(form.value.newPassword!=form.value.confirmNewPassword){
             this.toastr.error("Passwords do not match.")
           }
           else{
            this.toastr.error(err.error);
           } 
        }
        if(err.status == 200){
          this.toastr.success("Password updated successfully.")
          this.router.navigateByUrl('/login');
        }  

      }
    );
  }
}

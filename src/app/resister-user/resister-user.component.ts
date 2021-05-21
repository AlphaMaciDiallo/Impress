import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resister-user',
  templateUrl: './resister-user.component.html',
  styleUrls: ['./resister-user.component.css']
})
export class ResisterUserComponent implements OnInit {
  formGroup!: FormGroup;
  logVerif='';
 static userName:any;
  static test: any;
  CategoryTable?: any;
  constructor(private authService:AuthServiceService, private router:Router) { }
    sweetalertWrongPassWord(){
      Swal.fire({
        title: 'Wrong Email or Password',
        text: 'Do not have an account, Singup first',
        icon: 'warning',
     
        cancelButtonText: 'Ok, Understood'
      }).then((result) => {
        if (result.isConfirmed) {
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'kindly try again with the right informations :)',
            'error'
          )
        }
      })
    }
  loginText(email1:string , password1:string){
   
      const user ={
        email:email1,
        password:password1
      }
     this.authService.login(user).subscribe(result =>{
       if(result.Name){this.logVerif = result.Name;}
       if(this.logVerif !=''){
        this.router.navigateByUrl('impressInput');
        ResisterUserComponent.test =true;
        ResisterUserComponent.userName = this.logVerif;
      }else
      {
         this.sweetalertWrongPassWord();
      }
      
    })
    
    //console.log(ResisterUserComponent.userName);
    this.logVerif='';
  }

  sweetalertSuccesSingUp(){
    Swal.fire({
      title: 'Sucees',
      text: 'Succesfuly Registred',
      icon: 'success',
      cancelButtonText: 'Ok, Understood'
    })
  }

  Singup(Name:string ,email:string, password:string , repassword:string){
    const user ={
      Name:Name,
      email:email,
      password:password,
      repassword:repassword
    }
    if(password.localeCompare(repassword)==0)
    {
      //alert(user.email);
      this.authService.adduser(user).subscribe(result =>{
      
          this.sweetalertSuccesSingUp();
    
      })
    }
     
  }

  

  ngOnInit(): void {
    
  }

  initFrom(){
   
  }

  

}

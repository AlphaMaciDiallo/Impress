import { Component, Input, OnInit } from '@angular/core';
import { ResisterUserComponent } from '../resister-user/resister-user.component';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { OperationInputComponent } from '../operation-input/operation-input.component';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-impress-input',
  templateUrl: './impress-input.component.html',
  styleUrls: ['./impress-input.component.css']
})
export class ImpressInputComponent implements OnInit {
 
  test =false;
  name1 ='';
  verif='faux';
  ImpressTable:any;
  impress?: any;
  ImpressTableSize?:any;
   static lastCost =0;
   ipres={
    id: 0,
    amount: 0,
    permi: 0
  }
  static totlIpress : number;
  operationRem = OperationInputComponent.remainingImpress;
  TotalImpress =0;
   rr: number | undefined;
  form = new FormGroup({
    amount: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  })
  static ImpressTable: null;
  static lastPermit: number;
  totalOperation: any;
  
  constructor(private authService:AuthServiceService, private router:Router) { 
    this.test=ResisterUserComponent.test ; 
     this.name1=ResisterUserComponent.userName; 
     this.getAllImpress();
      this.TotalImpresss();
     //this.TotalImpresss();
     }

  ngOnInit(): void {
    ImpressInputComponent.totlIpress = 0;
  }
  
  checkDate(Sdate:string, Edate:string){
  
    try{
          
           if(new Date(Edate).valueOf()- new Date(Sdate).valueOf() < 0){
              alert('Kindly check your Dates');
            return false;
             
           }else
           {
            return true;
           }
         
       //dates = new Date(Sdate);
    }catch(err)
    {
       // console.log(err);
        return false;
    }
      
  }
  
  TotalImpresss(){
    this.authService.getTotalmpress().subscribe(result =>{
        
          this.totalOperation =result["0"];
          let ke = Object.values(this.totalOperation);
          this.totalOperation = ke;
         // console.log(this.totalOperation[0]+ parseInt(this.form.value.cost))
         ImpressInputComponent.totlIpress = this.totalOperation[0] 
         if(this.form.valid)
         {
          this.TotalImpress = ImpressInputComponent.totlIpress + parseFloat(this.form.value.amount);
         }else
         {
          this.TotalImpress = ImpressInputComponent.totlIpress; 
         }
        
         ImpressInputComponent.totlIpress = this.TotalImpress;
     })
    
  }
  
 

  sweetalertSucces(){
    Swal.fire({
      title: 'Sucees',
      text: 'Impress Succesfully Created',
      icon: 'success',
      cancelButtonText: 'Ok, Understood'
    })
  }

  SaveImpress(){
   this.TotalImpresss();
   // console.log(typeof(this.ImpressTable[0]) )
    if (this.name1 == null) {
      this.router.navigateByUrl('');
    }else{
     if(this.form.valid && this.checkDate(this.form.value.startDate,this.form.value.endDate) == true ){
        const ImpresValue ={
          amount:this.form.value.amount,
          startD:this.form.value.startDate,
          endD:this.form.value.endDate, //endDate
          userName:this.name1
        }
        this.authService.addImpress(ImpresValue).subscribe(result =>{
         // console.log(result);
          this.getAllImpress();
          this.form.reset();
          this.sweetalertSucces();
        })
      }else
      {
        alert('You are not allowed to creat a new Impress')
      }
    }
  }

  
  
  getAllImpress(){
        this.authService.getAllImpress().subscribe(result =>{
          this.ImpressTable = result;
       })
  }
  

  EditeImpress(data: any){
      //console.log(data);
    if (this.name1 == null) {
      this.router.navigateByUrl('');
    } else {
      this.impress = data;
      this.form.setValue({
        amount:this.impress.amount,
        startDate:this.impress.startD,
        endDate:this.impress.endD
      });
      
    }
  
  }

  sweetalertSuccesEdit(){
    Swal.fire({
      title: 'Sucees',
      text: 'Succesfuly Edited',
      icon: 'success',
      cancelButtonText: 'Ok, Understood'
    })
  }

  EditImpressFunc(){
      const UpdateValue ={
        id: this.impress.id,
        amount:this.form.value.amount,
        startD:this.form.value.startDate,
        endD:this.form.value.endDate, //endDate
        userName:this.name1
      }
     
      if( this.form.valid && this.checkDate(this.form.value.startDate,this.form.value.endDate) == true ){
          this.authService.editImpress(UpdateValue).subscribe(result =>{
           // console.log(result);
            this.getAllImpress();
            this.form.reset();
            this.sweetalertSuccesEdit();
          })
          this.impress=null;
      }
    
  }

  sweetalertSuccesDeleted(){
    Swal.fire({
      title: 'Sucees',
      text: 'Succesfuly Deleted',
      icon: 'success',
      cancelButtonText: 'Ok, Understood'
    })
  }

  DeleteImpress(data: any){
    if(confirm(`are you sure to delete thie impress Number  ${data.id}`)){
      this.authService.deleteImpress(data).subscribe(result =>{
       // console.log(result);
        this.getAllImpress();
        this.sweetalertSuccesDeleted();
     })
    }
   
 }

  
       
  




}

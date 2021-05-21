import { Component, OnInit } from '@angular/core';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { AuthServiceService } from '../auth-service.service';
import { ResisterUserComponent } from '../resister-user/resister-user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImpressInputComponent } from '../impress-input/impress-input.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-operationout-put',
  templateUrl: './operationout-put.component.html',
  styleUrls: ['./operationout-put.component.css']
})
export class OperationoutPutComponent implements OnInit {

  test =false;
  name1 ='';
  ImpressTable:any;
  operationTable: any;
  totalOperation:any;
  operaTab:any;
  operaTable=[];
  operationValue=0;
  ipres: any;
  toalImpre = ImpressInputComponent.totlIpress;
  constructor(private authService:AuthServiceService) { 
    this.test=ResisterUserComponent.test ;  
    this.name1=ResisterUserComponent.userName;
    this.getAllImpress();
    this.getAllIOperation();
    this.getTotal();
   }

  ngOnInit(): void {
  }

  form = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  })
  
  getAllImpress(){
    this.authService.getAllImpress().subscribe((result: any) =>{
      this.ImpressTable = result;
   })
 
}

// SowOperation(data : any){
//   this.ipres = data;
//   this.getTotal();
//   console.log(this.ipres.id)
//   this.authService.findOperation(data).subscribe((result: any) =>{
//     this.operationTable = result;
//  })
// }

 getAllIOperation(){
    this.authService.getAllIOperation().subscribe(result =>{
     this.operationTable = result;
   })
}

getTotal(){
  this.authService.getAllOperaionTotal().subscribe(result =>{
       this.totalOperation = result["0"];
      let ke = Object.values(this.totalOperation);
      this.totalOperation = ke;
      this.operationValue = this.totalOperation[0];
   // console.log(ke);
 })
}

 AscendingElement(){
    this.authService.getAllImpressbyAsc().subscribe((result: any) =>{
         this.ImpressTable = result;
    })
    this.authService.getAllOperationbyAsc().subscribe((result: any) =>{
        this.operationTable = result;
    })
 }

 getAllOperationbyDesc(){
    this.authService.getAllImpressbyDesc().subscribe((result: any) =>{
       this.ImpressTable = result;
    })
    this.authService.getAllOperationbyDesc().subscribe((result: any) =>{
      this.operationTable = result;
    })
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

 verificationDates(){
   if(this.operaTable.length > 0){
     console.log( this.operaTable)
    this.operationTable = this.operaTable
   }
   
  var i =0;
  var j =0;
  this.operaTab = [];
   console.log("Hello");
   if(this.form.valid && this.checkDate(this.form.value.startDate,this.form.value.endDate) == true ){
    var s = new Date(this.form.value.startDate);
    var e = new Date(this.form.value.endDate);
    this.operationTable.forEach((element: { 	dateIsuue: any; }) => {
       var a = new Date(element.dateIsuue)
      var d1 =s.valueOf() - a.valueOf();
      var d2 = a.valueOf() - e.valueOf()
       // console.log('start'+d1); 
       // console.log('end'+d2); 
        if(d1 <=0 && d2 <= 0){
          console.log('koto sow');
           this.operaTab[i] =  this.operationTable[j];
           i++;
        }
        j++;
    });
    if(this.operaTab != null)
    {
     console.log(this.operaTab)
     this.operaTable = this.operationTable
      this.operationTable =this.operaTab
    }
   }
 }

}

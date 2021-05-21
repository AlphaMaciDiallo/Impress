import { Component, OnInit } from '@angular/core';
import { ResisterUserComponent } from '../resister-user/resister-user.component';
import { OperationInputComponent } from '../operation-input/operation-input.component';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-impressout-put',
  templateUrl: './impressout-put.component.html',
  styleUrls: ['./impressout-put.component.css']
})
export class ImpressoutPutComponent implements OnInit {

  test =false;
  name1 ='';
  myCompany:any;
  constructor(private authService:AuthServiceService ) { 
    this.test=ResisterUserComponent.test ;  
    this.name1=ResisterUserComponent.userName
    this.getCompany(); }

  ngOnInit(): void {
  
  }
  operation ={
    id: OperationInputComponent.operationPrint.id,
    category:OperationInputComponent.operationPrint.category,
    sCategory:OperationInputComponent.operationPrint.sCategory,
    IssuedBy:OperationInputComponent.operationPrint.IssuedBy,
    receivedBy:OperationInputComponent.operationPrint.receivedBy,
    dataI:OperationInputComponent.operationPrint.dateIsuue,
    cost:OperationInputComponent.operationPrint.cost,
    description:OperationInputComponent.operationPrint.description
  }
  Company ={
    name:0,
    adress:0,
    tel:0,
    email:0
  }

  getCompany(){
     this.authService.getCompany().subscribe(result =>{
      if(typeof(result["0"]) != "undefined")
      {
       
        this.myCompany =result["0"];
        let ke = Object.values(this.myCompany);
        this.myCompany = ke;
        console.log(this.myCompany[1])
        this.Company.name = this.myCompany[1];
        this.Company.adress = this.myCompany[2];
        this.Company.tel = this.myCompany[3];
        this.Company.email = this.myCompany[4];

      }
     
     
   })

  }

}

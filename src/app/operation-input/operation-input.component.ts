import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { ImpressInputComponent } from '../impress-input/impress-input.component';
import { ResisterUserComponent } from '../resister-user/resister-user.component';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-operation-input',
  templateUrl: './operation-input.component.html',
  styleUrls: ['./operation-input.component.css']
})
export class OperationInputComponent implements OnInit {

  test =false;
  name1 ='';
  CategoryTable?: any;
  SubCategoryTable?: any;
  cateSelected:Number | undefined;
  SubCatSelected:Number | undefined;
  ipres={
    id: 0,
    amount: 0,
    permi: 0
  }
 dateS = new Date();
 

  form = new FormGroup({
    description: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    receiver: new FormControl('', Validators.required)
  })
  OperationTable: any;
  operation: any;
  static SubCategoryTable: null;
  static remainingImpress = 0;
  static CategoryTable: any;
  static operationPrint ={
    id:'',
    category:'',
    sCategory:'',
    IssuedBy:'',
    receivedBy:'',
    dateIsuue:'',
    cost:'',
    description:''
  };
  lastAmount: number | undefined;
  totalOperation:any;
  ImpressTable?:any;
  previeCost?:any;
  totalOperationvalue=0;
   amountImp=0;
   a=0;
  constructor(private authService:AuthServiceService ,private router:Router) { this.test=ResisterUserComponent.test ; 
     this.name1=ResisterUserComponent.userName ;
     this.getCategory();
     this.getAllIOperation();
     
     this.getAllImpress();
     this.getTotal();
    
    // this.lastImpress();
     
     }

  ngOnInit(): void {
    this.cateSelected =0;
    this.SubCatSelected =0;
    this.amountImp=0;
    this.a=0;
    //this.getTotal();
  }

  getTotal(){
     var a  = this.getAllImpress();
  
    this.authService.getAllOperaionTotal().subscribe(result =>{
      // if(typeof(result["0"]) == "undefined")
      // {
      //   this.totalOperation =0;
      //   this.totalOperationvalue = 0;
      // }else
      // {
      //   this.totalOperation =result["0"];
      //   let ke = Object.values(this.totalOperation);
      //   this.totalOperation = ke;
      //   console.log(this.totalOperation[0]+ parseInt(this.form.value.cost))
      //   this.totalOperationvalue = this.totalOperation[0] + parseInt(this.form.value.cost);
      // }
      this.totalOperation =result["0"];
        let ke = Object.values(this.totalOperation);
        this.totalOperation = ke;
    // console.log(this.totalOperation[0]+ parseInt(this.form.value.cost))
    this.totalOperationvalue = this.totalOperation[0];
    OperationInputComponent.remainingImpress = ImpressInputComponent.totlIpress - this.totalOperationvalue;

     if(this.form.valid && this.CostChecked()== true)
     {
        this.totalOperationvalue = this.totalOperation[0] + parseFloat(this.form.value.cost);
        OperationInputComponent.remainingImpress = ImpressInputComponent.totlIpress - this.totalOperationvalue;
      
      }
     
   })
  }

 


  
  getAllIOperation(){
    this.authService.getAllIOperation().subscribe(result =>{
      this.OperationTable = result;
   })
}

  getCategory(){
      this.authService.getCat().subscribe(result =>{
        this.CategoryTable = result;
       // console.log(this.CategoryTable.name);
    })
  }

  getsubCategory(data: any){
    this.cateSelected = data;
    const data1={
      id:data
    }
        this.authService.getSub(data1).subscribe(result =>{
          this.SubCategoryTable = result;
          //console.log(this.CategoryTable.name);
      })
  }

  getsubCategory1(data: any){
    this.SubCatSelected = data;
  }



getAllImpress(){
  this.authService.getAllImpress().subscribe(result =>{
    this.ImpressTable = result;
    //console.log(this.ImpressTable.id)
 })
}


  sweetAlert(){
    Swal.fire({
      title: 'Not Allowed to create an operation',
      text: 'kindly go back and create another impress ',
      icon: 'warning',
      cancelButtonText: 'Ok, Understood'
    })
    
  }

  CostChecked()
  {
    console.log('total operation'+ this.totalOperationvalue );
    if(this.totalOperationvalue > 0){
      this.amountImp =this.totalOperationvalue ;
    }
    var aa =parseFloat(this.form.value.cost)
   this.a= this.amountImp +aa;
    console.log('condition value'+ this.a)
    if(this.a<  ImpressInputComponent.totlIpress){
      this.totalOperationvalue = this.a;
         // console.log('accorder')
    //     OperationInputComponent.remainingImpress = ImpressInputComponent.totlIpress - this.totalOperationvalue;
        // console.log('remainin '+ OperationInputComponent.remainingImpress);
         return true
    }else
    {
       this.sweetAlert();
       return false
    }
  }

  checkPermission (){

    if(this.ImpressTable.succes != 0 )
    {
   // console.log('accorder')      
       return this.CostChecked()
    }else
    {
      alert('kindly go back and creat an Impress')
      //console.log(' non accorder')
      return false
    }
    //console.log(this.ImpressTable.succes);
  
  }

  SaveOperation(dateval : any){
    this.getTotal();
    //var bb =this.checkPermission();
    if (this.name1 == null) {
      this.router.navigateByUrl('');
    }else{
      if(this.form.valid && this.checkPermission() == true){
        const operation ={
          description:this.form.value.description,
          category:  this.cateSelected,
          sCategory: this.SubCatSelected,
          cost:this.form.value.cost,
          dateIsuue: dateval,
          IssuedBy:this.name1,       
          receivedBy: this.form.value.receiver,
          idImprss:this.ipres.id
        }
        this.authService.addOperation(operation).subscribe(result =>{
        // console.log(result);
        //  this.getAllImpress();
      //  this.totalOperation = parseFloat(this.totalOperation) + parseFloat(this.form.value.cost);
          this.getAllIOperation()
          this.form.reset();
        })
      }
    }
  //  var v= this.checkPermission()
  //   this.getTotal();
  //  console.log(this.totalOperation);
  
  }
PrintOperation(data : any){
  OperationInputComponent.operationPrint.id = data.id;
  OperationInputComponent.operationPrint.category = data.category;
  OperationInputComponent.operationPrint.sCategory = data.sCategory;
  OperationInputComponent.operationPrint.IssuedBy = data.IssuedBy;
  OperationInputComponent.operationPrint.receivedBy = data.receivedBy;
  OperationInputComponent.operationPrint.dateIsuue = data.dateIsuue;
  OperationInputComponent.operationPrint.cost = data.cost;
  OperationInputComponent.operationPrint.description = data.description;
   this.router.navigateByUrl('impressoutPut');

}
  
  EditOperation(data: any){
    //console.log(data);
  if (this.name1 == null) {
    this.router.navigateByUrl('');
  } else {
    this.operation = data;
   // console.log(this.operation.description+''+this.operation.cost)
    this.form.setValue({
      description:this.operation.description,
      cost:this.operation.cost,
      receiver:this.operation.receivedBy
    });
    console.log(this.operation.description+''+this.operation.cost);
    // this.form.value.endDate = this.impress.endD;
    // document.getElementById("amount1")!.setAttribute('value', this.impress.amount);
    // document.getElementById("startDate1")!.setAttribute('value', this.impress.startD);
    // document.getElementById("endDate1")!.setAttribute('value', this.impress.endD);
   // console.log(this.impress);
  }

}
sweetalertSucces(){
  Swal.fire({
    title: 'Sucees',
    text: 'Operation Succesfully Updated',
    icon: 'success',
    cancelButtonText: 'Ok, Understood'
  })
}

EditOperations(){
  if(this.form.valid ){
    const operation ={
      id:this.operation.id,
      description:this.form.value.description,
      category:  this.cateSelected,
      sCategory: this.SubCatSelected,
      cost:this.form.value.cost,
      dateIsuue: this.dateS,
      IssuedBy:this.name1,       
      receivedBy: this.form.value.receiver
    }
    this.authService.editOperation(operation).subscribe(result =>{
      this.getAllIOperation()
      this.form.reset();
      this.sweetalertSucces();
    })
    this.operation=null;
  }
}


}

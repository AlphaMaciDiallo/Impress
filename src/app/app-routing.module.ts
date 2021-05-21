import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressInputComponent } from './impress-input/impress-input.component';
import { ResisterUserComponent } from './resister-user/resister-user.component';
import { OperationInputComponent } from './operation-input/operation-input.component';
import { OperationoutPutComponent } from './operationout-put/operationout-put.component';
import { ImpressoutPutComponent } from './impressout-put/impressout-put.component';


const routes: Routes = [
  {path:'', component:ResisterUserComponent},
  {path:'impressInput', component:ImpressInputComponent},
  {path:'impressoutPut', component:ImpressoutPutComponent},
  {path:'operationInput', component:OperationInputComponent},
  {path:'operationoutPut', component:OperationoutPutComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

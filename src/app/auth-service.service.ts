import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
 
  login(data: any):Observable<any>{
    return this.http.post(`${baseURL}find`,data);
  }

  adduser(data: any):Observable<any>{
    return this.http.post(`${baseURL}singup`,data);
  }

  //-------------------------------Impress------------
  addImpress(data: any):Observable<any>{  
    return this.http.post(`${baseURL}impress`,data);
  }

  getAllImpress():Observable<any>{  
    return this.http.get(`${baseURL}getAllImpress`);
  }

  getTotalmpress():Observable<any>{  
    return this.http.get(`${baseURL}getTotalmpress`);
  }

  getCat():Observable<any>{  
    return this.http.get(`${baseURL}getCategory`);
  }
  
  getSub(data: any):Observable<any>{  
    return this.http.post(`${baseURL}getsubCategory`,data);
  }

 

  deleteImpress(data: any):Observable<any>{  
    return this.http.post(`${baseURL}deletImpress`, data);
  }

  udpatePermission(data: any):Observable<any>{  
    return this.http.post(`${baseURL}udpatePermission`, data);
  }

  editImpress(data: any):Observable<any>{  
    return this.http.post(`${baseURL}editImpress`, data);
  }
//-----------------------------operation
addOperation(data: any):Observable<any>{  
  return this.http.post(`${baseURL}operationSave`,data);
}

getAllIOperation():Observable<any>{  
  return this.http.get(`${baseURL}getAllIOperations`);
}

deleteIOperation(data: any):Observable<any>{  
  return this.http.post(`${baseURL}deletOperation`, data);
}

editOperation(data: any):Observable<any>{  
  return this.http.post(`${baseURL}editOperation`, data);
}

getAllOperaionTotal():Observable<any>{  
  return this.http.get(`${baseURL}getAllOperaionTotal`);
}

findOperation(data: any):Observable<any>{  
  return this.http.post(`${baseURL}findOperation`, data);
}

//---Company
getCompany():Observable<any>{  
  return this.http.get(`${baseURL}getCompany`);
}

//--operation Ascending descending verification ----------------
getAllOperationbyAsc():Observable<any>{  
  return this.http.get(`${baseURL}getAllOperationbyAsc`);
}
getAllOperationbyDesc():Observable<any>{  
  return this.http.get(`${baseURL}getAllOperationbyDesc`);
}

//--Impress Ascending descending verification ----------------
getAllImpressbyAsc():Observable<any>{  
  return this.http.get(`${baseURL}getAllImpressbyAsc`);
}
getAllImpressbyDesc():Observable<any>{  
  return this.http.get(`${baseURL}getAllImpressbyDesc`);
}

}

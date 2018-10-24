import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class MenuApi {
  private Localhost ='http://Localhost:8080/orderapp/api/OrderApp/' ;

  private id : any;
  private headers = new Headers();

  constructor(private http: Http) {

   this.headers.append('Content-Type', 'application/json');
  }


  private handleError(error: any): Promise<any> {
    console.error('An  error ocurred', error)//for demo purposes only
    return Promise.reject(error.message ||  error);
 }


 Authentication(login , password){
  return new Promise(resolve => {
   this.http.get(`${this.Localhost}Authentication?login=${login}&password=${password}`)
   .subscribe(res => resolve(res.json())) ;
  });
}


  getCategories(){
    return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaCategories`)
     .subscribe(res => resolve(res.json())) ;
    });
  }

  sendCategoria(data){
    return new Promise(resolve => {
      this.http.post(`${this.Localhost}setcategoria?namecategoria=${data.categoria}`,
              JSON.stringify(data)) //{headers: this.headers}
          .subscribe(res => resolve(res.json())) //ok;1;
    });
  }

  deleteCategoria(data){
    return new Promise(resolve => {
     this.http.delete(`${this.Localhost}deleteCategoria?id=${data.id_category}`)
     .subscribe(res => resolve(res.json())) ;
    });
  }

  getMenu(category){
    return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaMenu?category=${category}`)
     .subscribe(res => resolve(res.json())) ;
    });
  }

  // &id_restaurant=1
  sendMenuType(data, item){
    return new Promise(resolve => {
      this.http.post(`${this.Localhost}setMenyType?name=${data.name}
                                                  &description=${data.description}
                                                  &price=${data.price}
                                                  &id_category=${item.id_category}
                                                  &id_restaurant=1`,
                        JSON.stringify(data)) //{headers: this.headers}
          .subscribe(res => resolve(res.json())) //ok;1;
    });
  }

  deleteMenuType(data){
    return new Promise(resolve => {
     this.http.delete(`${this.Localhost}deleteMenyType?id=${data.id_menu}`)
     .subscribe(res => resolve(res.json())) ;
    });
  }
  

  sendorders(order,user){
    return new Promise(resolve => {
      this.http.post(`${this.Localhost}setOrder?id_user=${order.id_remote}
                                      &id_restaurant=${order.id_restaurant}
                                      &id_menu=${order.id_menu}
                                      &description=${order.description}
                                      &price=${order.price}
                                      &quantity=${order.quantity}
                                      &id_table=${order.id_table}
                                      &id_garcao=${order.id_garcao}
                                      &id_client=${user.id}`,
                      JSON.stringify(order)) //{headers: this.headers}
              .subscribe(res => resolve(res.json())) //ok;1;
    });
  }

  receiveorders(user){
    return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaOrders?id_user=${user.id}`)
     .subscribe(res => resolve(res.json())) ;
    });
  }

  deleteorder(order){
    return new Promise(resolve => {
     this.http.delete(`${this.Localhost}deleteOrder?id=${order.id}`)
     .subscribe(res => resolve(res.json())) ;
    });
  }

  getTables(id_user , id_restaurant, usertype){
    return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaTables?id_servidor=${id_user}
                                                    &id_restaurant=${id_restaurant}
                                                    &usertype=${usertype}`)
              .subscribe(res => resolve(res.json())) ;
    });
  }

  setTable(id_garcao,id_restaurant,numTable){
    return new Promise(resolve => {
     this.http.post(`${this.Localhost}settable?id_garcao=${id_garcao}
                                              &id_restaurant=${id_restaurant}
                                              &numTable=${numTable}`,
                    JSON.stringify(numTable)) 
              .subscribe(res =>  resolve(res.json())
            )
    });
  }

  deleteTable(data){
    return new Promise(resolve => {
     this.http.delete(`${this.Localhost}deleteTable?id=${data}`)
     .subscribe(res => resolve(res.json())) ;
    });
  }

  getTableOrders(id_table){
    return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaTableOrders?id_table=${id_table}`)
     .subscribe(res => resolve(res.json())) ;
    });
  }

  getQRcode(code){
    return new Promise(resolve => {
      this.http.get(`${this.Localhost}ConsultaQrCode?QrcodeString=${code}`)
      .subscribe(res => resolve(res.json())) ;
     });
  }

  setQrCode(id_gerente,newQRcode){
    return new Promise(resolve => {
      this.http.post(`${this.Localhost}setQrCode?id=1&id_gerente=${id_gerente}
      &QrcodeString=${newQRcode}`,JSON.stringify(newQRcode)) 
          .subscribe(res =>  resolve(res.json())
        )
    });
  }

  setGarcaoesAcesso(id_restaurant,id,status){
    return new Promise(resolve => {
      this.http.post(`${this.Localhost}setGarcaoesAcesso?id_restaurant=${id_restaurant}
                                                        &id=${id}
                                                        &rest_block=${status}`,
                        JSON.stringify(status)) 
              .subscribe(res =>  resolve(res.json())
        )
    });
  }

  getGarcaoes(gerente , id_restaurant){
    return new Promise(resolve => {
      this.http.get(`${this.Localhost}getgarcaoes?gerente=${gerente}&id_restaurant=${id_restaurant}`)
      .subscribe(res => resolve(res.json())) ;
     });
  }

  getMesasGarcao(listtype, id_restaurant, id_garcao){
    return new Promise(resolve => {
      this.http.get(`${this.Localhost}getMesasGarcao?listtype=${listtype}
                                                  &id_restaurant=${id_restaurant}
                                                  &id_garcao=${id_garcao}`)
              .subscribe(res => resolve(res.json())) ;
     });
  }

  getoredersmesa(usertype,id_table){
    return new Promise(resolve => {
      this.http.get(`${this.Localhost}getoredersmesa?id_table=${id_table}&usertype=${usertype}`)
      .subscribe(res => resolve(res.json())) ;
     });
  }
  
  checklogin(login){
    return new Promise(resolve => {
      this.http.get(`${this.Localhost}checklogin?login=${login}`)
      .subscribe(res => resolve(res.json())) ;
     });
  }

  addGarcao(id_restaurant,name,login,password){
  return new Promise(resolve => {
    this.http.post(`${this.Localhost}setnovoGarcao?id_restaurant=${id_restaurant}
                                                  &name=${name}
                                                  &login=${login}
                                                  &password=${password}`,
                       JSON.stringify(login)) 
           .subscribe(res =>  resolve(res.json())
      )
  });
}

setPedidas(order,data){
    return new Promise(resolve => {
    this.http.post(`${this.Localhost}setPedidas?id_client=${order.id_client}
                                                &id_restaurant=${order.id_restaurant}
                                                &id_table=${order.id_table}
                                                &id_garcao=${order.id_garcao}
                                                &subtotal=${data.subtotal}
                                                &servico=${data.servico}
                                                &total=${data.total}`,
                    JSON.stringify(data)) 
            .subscribe(res =>  resolve(res.json())
        )
  });
}

  setPedidasMenu(order,data,id_pedida){
    return new Promise(resolve => {
    this.http.post(`${this.Localhost}setPedidasMenu?id_menu=${order.id_menu}
                                                  &quantity=${order.quantity}
                                                  &description=${order.description_client}
                                                  &id_pedida=${id_pedida}
                                                  &id_order=${order.id}`,
                                    JSON.stringify(data)) 
              .subscribe(res =>  resolve(res.json())
          )
  });
}

getpedidas(id_client){
  return new Promise(resolve => {
    this.http.get(`${this.Localhost}getpedidas?id_client=${id_client}`)
    .subscribe(res => resolve(res.json())) ;
   });
}

  updateProfil(user,novouser){
  return new Promise(resolve => {
  this.http.post(`${this.Localhost}updateProfil?id=${user.id}
                                              &email=${novouser.email}
                                              &nome=${novouser.name}
                                              &endereco=${novouser.endereco}
                                              &cidade=${novouser.cidade}
                                              &cellular=${novouser.cellular}`,
                  JSON.stringify( novouser)) 
      .subscribe(res =>  resolve(res.json())
      )
    });
  }

}

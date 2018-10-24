import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { SqlStorage } from '../sql-storage/sql-storage';

const win: any = window;

@Injectable()
export class UserSettings {
  private sqlMode= false ; 

  constructor(private events : Events,
              private storage : Storage,
              private sql : SqlStorage ) {

    if (win.sqlitePlugin) {
          this.sqlMode = true;
      } else {
          console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
      }
  }

  initStorage() : Promise<any>{
    if(this.sqlMode){
      return this.sql.initializeDatabase();
    } else {
      return new Promise(resolve => resolve())
    }
  }

  setorder (user,order,data,numtable) {
    if(this.sqlMode){
      return this.sql.setorder(user,order,data,numtable)
      }else{
        this.storage.set(order.id_menu.toString(),user);
    }
  }

  deleteorder(order) {
    if(this.sqlMode){
      return this.sql.remove(order);
    } else {
    return new Promise(resolve=> {
      this.storage.remove(JSON.stringify(order)).then(() => {
          this.events.publish('orders:changed');
          resolve();
          });
      });
    }
  }

  getUserlocal(){
    if(this.sqlMode){
      return this.sql.getUser();
    }
  }

  updateUserinfo(user){
    if(this.sqlMode){
      return this.sql.UpdateUserinfo(user);
    }
  }

  setTableUser(user){
    if(this.sqlMode){
       this.sql.setTableUser(user);
    }
}


  getlocalorder(user, numtable) : Promise<any>{
    let results : any ;
    if (this.sqlMode){
      return this.sql.getAll(user,numtable);
    } else 
    return results;
  }

  getlocalbeforeconnect(user,id_restaurant): Promise<any>{
    let results : any ;
    if (this.sqlMode){
      return this.sql.getlocalbeforeconnect(user,id_restaurant);
    } else 
    return results;
  }

  UpdateOrderStatus(id){
    if(this.sqlMode){
      return this.sql.UpdateOrderStatus(id);
    }
  }



  




}

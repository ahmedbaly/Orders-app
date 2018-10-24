import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class SqlStorage {
    public db: SQLiteObject;
    private id_remote : any ;
    query : any; 

  constructor(private sqlite : SQLite) {
  }

    getUser(){   
        return this.db.executeSql('select * from users ',[])
            .catch(e => {console.error("query select error ",e)});
    }

    setTableUser(user){
        return new Promise(resolve => {
            this.db.executeSql('select id_remote from users where id_remote = ? ',[user.id])
                .then((data) => { 
                    setTimeout(() => {
                            this.UpdateinsertUser(user, data)
                    }, 2000);
                })
            })
        }


    UpdateinsertUser (user, dataresult){
        if (dataresult.rows.length > 0) {
            this.id_remote = dataresult.rows.item(0).id_remote ; 
            return this.db.executeSql('update users set id_remote = ?, name = ?, usertype = ? where id_remote = ?',
                [user.id, user.name, user.usertype, this.id_remote])
                .catch(e => {console.error("query update error ",e)});
        }
        
        else {
            return this.db.executeSql('insert into users(id_remote, name, usertype) values (?, ?, ?)',
                                        [user.id, user.name, user.usertype])
            .catch(e => {console.error("query insert error ",e)});
        }
    }

    UpdateUserinfo(user){
        return this.db.executeSql('update users set name = ?, email = ?, endereco = ?, cidade = ?, cellular = ? where id_remote = ?',
            [user.name, user.email, user.endereco, user.cidade, user.cellular, this.id_remote])
            .catch(e => {console.error("UpdateUserinfo error ",e)});
    }

    setorder(user,order,data,table){
        let results :any;
        data.forEach(data => {
            results = data;
        });
        return this.db.executeSql('insert into orderslocal ' + 
            '( id_remote, name, price, quantity, description, id_table , status , id_restaurant , id_menu, id_garcao, numTable) '+
            'values (?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?)',
            [user.id, order.name, order.price, results.quantity, results.description,
            table.id , "N", order.id_restaurant, order.id_menu,user.id, table.numTable ])
        .then(data => console.log(data));
    }


    getAll(user , table){
        return this.db.executeSql('SELECT * FROM orderslocal where id_remote = ? and numTable = ? and id_restaurant = ? and status = ?',
         [user.id , table.numTable, user.id_restaurant , "N"])
            .then(data => {
                let results = [];
                for (let i = 0; i < data.rows.length; i++) {
                    results.push(data.rows.item(i));
                }
                return results;
        });
    }

    remove(order){
        return this.db.executeSql('delete from orderslocal where id = ?', [order.id]) 
                      .then(res => res)
                      .catch(e => console.log(e));
        }

    UpdateOrderStatus(id){
        return this.db.executeSql('update orderslocal set status = ?  where id = ?', ["S",id]) 
        .then(res=> res)
        .catch(e => console.log(e));
    }
    
    getlocalbeforeconnect(user, id_restaurant){
        return this.db.executeSql('SELECT * FROM orderslocal where id_remote = ? and id_restaurant = ? and status = ?',
        [user.id , id_restaurant , "N"])
           .then(data => {
               let results = [];
               for (let i = 0; i < data.rows.length; i++) {
                   results.push(data.rows.item(i));
               }
               return results;
       });
    }

/**************************************************************************************************************************************/
    /*
     * Should be called after deviceready event is fired
     */
    initializeDatabase(){
      return this.sqlite.create({ name: 'data.db', location: 'default' })
        .then((db) => {
            this.db = db;
                this.CreateTable(this.USERS_TABLE, "users");
                this.CreateTable(this.ORDER_TABLE, "orderslocal");           
                })
        .catch(e => console.log("initializeDatabase",e));
      }


    CreateTable(script: string, TableNAme : string) {
        this.db.executeSql(script , []).then(data =>
             { console.log('**after CREATE TABLE ' + TableNAme, data);
                   }).catch(e => console.log("CreateTable",e));
    }

    ORDER_TABLE : string = 'CREATE TABLE IF NOT EXISTS orderslocal ('+
                                'id INTEGER PRIMARY KEY AUTOINCREMENT, '+
                                'id_remote INTEGER, '+
                                'id_table INTEGER, '+
                                'id_restaurant INTEGER, '+
                                'status TEXT, '+
                                'id_menu INTEGER, '+
                                'id_cliente INTEGER, '+
                                'id_garcao INTEGER, '+
                                'numTable TEXT, '+
                                'name TEXT, '+
                                'price TEXT, '+
                                'quantity TEXT, '+
                                'description TEXT )'
                                
    
    USERS_TABLE : string  =  'CREATE TABLE IF NOT EXISTS users ('+
                                'id INTEGER PRIMARY KEY AUTOINCREMENT,'+
                                'id_remote INTEGER,'+
                                'id_restaurant INTEGER,'+
                                'name TEXT,'+
                                'email TEXT,'+
                                'endereco TEXT,'+
                                'cidade TEXT,'+
                                'cellular TEXT,'+
                                'usertype TEXT )'      
       

}

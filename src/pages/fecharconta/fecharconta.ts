import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';
import { MenuApi } from '../../providers/menu-api/menu-api';


@Component({
  selector: 'page-fecharconta',
  templateUrl: 'fecharconta.html',
})
export class FecharcontaPage {
  public quantity : any;
  public subtotal : any;
  public servico : any;
  public total : any ; 

  public orderTable : any ;
  itemPrice : number = null;
  table =null ;
  user = null ;

  constructor(
      public navParams: NavParams,
      public viewCtrl: ViewController, 
      public menuApi : MenuApi) {
  }

  ionViewDidLoad() {
    /// random prices
    this.subtotal = "0";
    this.servico = "25.00"
    this.total = "0";

    this.user = this.navParams.data[0].user ; //get('user')
    this.table = this.navParams.data[1].table //.get('table');
    this.orderTable = this.navParams.data[2].order //.get('order')
    this.subtotal = this.navParams.data[3].total //get('total')

    this.itemPrice = (this.subtotal * 1) + (this.servico*1);
    this.total = this.itemPrice;

  }

  clickback(){
    this.viewCtrl.dismiss();
  }

  clicktoOrder(){
    let data = {
      subtotal : this.subtotal,
      servico : this.servico,
      total : this.total
    }
    this.viewCtrl.dismiss(data)
  }
}

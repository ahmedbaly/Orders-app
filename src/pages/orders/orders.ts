import { Component } from '@angular/core';

import { NavController, NavParams, AlertController,
   LoadingController, ViewController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { MenuApi } from '../../providers/menu-api/menu-api';
import { UserSettings } from '../../providers/user-settings/user-settings';

import { OrdersToPage } from './orders-to-command/orders-to';
import { OrdersComPage } from './orders-commanded/orders-com';
import { CardListPage } from '../card-list/card-list';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage  {
public orders : any;
   user = null;
   table = null;
   params = null ;
   tab1Root = OrdersToPage;
   tab2Root = OrdersComPage;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams) {      
      this.user = this.navParams.get('data')
      this.table = this.navParams.get('mesa')

      this.params = {
        user : this.user ,
        table : this.table
      }
  }

  ionViewDidLoad() {
  }

  goHome(){
    this.app.getRootNav().setRoot(CardListPage,{data : this.user, mesa : this.table})
}




 
}

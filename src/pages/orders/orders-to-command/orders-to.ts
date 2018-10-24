import { Component } from '@angular/core';

import { NavParams, AlertController, LoadingController,  App, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { MenuApi } from '../../../providers/menu-api/menu-api';
import { UserSettings } from '../../../providers/user-settings/user-settings';

import { CardListPage } from '../../card-list/card-list';


@Component({
  selector: 'page-orders-to',
  templateUrl: 'orders-to.html',
})
export class OrdersToPage  {
  public orders : any;
  public i = 0;
  user = null;
  table = null;
  public quantitytotal : any  ; 
  public total : any;

  constructor(
    private alertCtrl: AlertController,
    private loadingController : LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    private menuApi: MenuApi,
    private userSettings : UserSettings,
    private app : App) {      
      this.user = this.navParams.data.user
      this.table = this.navParams.data.table
  }

  ionViewDidLoad() {
    this.total = 0;
    this.quantitytotal = 0;
    this.getallorders();
  }

  delete (order){
    this.showConfirm(order);
  }

  showConfirm(order) {
    const confirm = this.alertCtrl.create({
      title: 'Excluir ordem',
      message: 'Confirma a exclusão ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.userSettings.deleteorder(order).then(data =>{
              this.presentToast("Ordem exluido")
              this.getallorders();
            })
          }
        }
      ]
    });
   confirm.present();
  }


  getallorders(){
    let loader = this.loadingController.create({
      content: 'Pedidando..',
      dismissOnPageChange: true,
      duration : 1500
      });
    loader.present();
    this.userSettings.getlocalorder(this.user, this.table).then((data)=> {
      this.orders = data; 
      this.gettotal(this.orders);
      loader.dismiss();
    })  
  }

  gettotal(orders) {
    this.quantitytotal = 0 ;
    this.total = 0;
    orders.forEach(order => {
       this.total =  (order.quantity * order.price) + this.total ;
       this.quantitytotal++ ;
      });
  }

  AlertPedida() {
    const confirm = this.alertCtrl.create({
      title: 'PEDIR',
      message: 'Confirma a pedida?',
      buttons: [
      {
        text: 'Não',
        handler: () => {
        }
      }, {
        text: 'Sim',
        handler: () => {
          this.sendOrder();
        }
     }
    ]
  });
  confirm.present();
}

  sendOrder(){
    let loader = this.loadingController.create({
      content: 'Pedidando..',
      dismissOnPageChange: true,
      duration : 1500
      });
    loader.present();
    this.orders.forEach(order => {
      this.menuApi.sendorders(order,this.user).then( (data) => {
        loader.dismissAll();
        this.userSettings.UpdateOrderStatus(order.id).then(data =>{
          this.presentToast("Ordem foi enviado com sucesso")
        })
      })
    });
    this.app.getRootNav().setRoot(CardListPage,{data : this.user , mesa : this.table})
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }


}

import { Component } from '@angular/core';
import { NavController, NavParams,  LoadingController, ModalOptions,
   ModalController, App, Toast, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { MenuApi } from '../../../providers/menu-api/menu-api';
import { UserSettings } from '../../../providers/user-settings/user-settings';

import { FecharcontaPage } from '../../fecharconta/fecharconta';
import { CardListPage } from '../../card-list/card-list';
import { MesasGarcao } from '../../mesas-gerente/mesas-gerente-garcao/mesas-garcao';
import { TableListPage } from '../../table-list/table-list';
import { QRScannerPage } from '../../qrscanner/qrscanner';

@Component({
  selector: 'page-orders-com',
  templateUrl: 'orders-com.html',
})
export class OrdersComPage  {
public orders : any;
   user = null;
   table = null;
   public orderTable : any ;
   itemPrice : number = null
   total : string = null

  constructor(
    public navCtrl: NavController,
    private loadingController : LoadingController,
    public navParams: NavParams,
    private menuApi:MenuApi,
    private userSettings : UserSettings,
    public modalCtrl : ModalController,
    public toastCtrl : ToastController,
    public app : App) {    
      this.user = this.navParams.data.user;
      this.table = this.navParams.data.table;
  }

  ionViewDidLoad() {
    this.total = "0";

    let loader = this.loadingController.create({
      content: 'Pegando os dados...',
      dismissOnPageChange: true
    });
    loader.present();
    this.menuApi.getoredersmesa("",this.table.id).then(data => {
      loader.dismiss();
      this.orderTable = data;
      this.itemPrice =null;
      this.orderTable.forEach(item => {
        this.itemPrice = (item.quantity * item.price) + this.itemPrice;
      });
      if(this.itemPrice!== null) {
        this.total = this.itemPrice.toFixed(2)
      }
    });
  }

  AlertPedida(){
    const myModelOptions : ModalOptions ={
      enableBackdropDismiss : false , 
      showBackdrop : true 
    }
    let Modal = this.modalCtrl.create(FecharcontaPage,
       [{ user : this.user },
        {table : this.table},
        {order : this.orderTable},
        {total : this.total}],
      myModelOptions);
    
    Modal.onDidDismiss(data => {
      if(data != undefined){
        this.sendOrder(data)
      }
    })
    Modal.present();
  }

  sendOrder(data){
    let loader = this.loadingController.create({
      content: 'Pedidando..',
      dismissOnPageChange: true,
      duration : 1500
      });
    loader.present();
    this.menuApi.setPedidas(this.orderTable[0],data).then( (pedida) => {
        this.menuApi.setPedidasMenu(this.orderTable[0],data,pedida).then( (pedidamenu) => {
          loader.dismiss()
        });
      if(this.user.usertype==='garcao'){
        this.presentToast("A conta e fechou");
        this.app.getRootNav().setRoot(TableListPage,{data : this.user})
       } else if( this.user.usertype==='cliente'){
        this.presentToast("A conta e fechou");
        this.navCtrl.setRoot(QRScannerPage,{data : this.user});
      }
    });
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }
  
}

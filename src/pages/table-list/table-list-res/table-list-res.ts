import { Component, NgModule } from '@angular/core';
import { NavParams, AlertController, LoadingController, App,
   ModalOptions, ModalController, ToastController } from 'ionic-angular';

import { UserSettings } from '../../../providers/user-settings/user-settings';
import { MenuApi } from '../../../providers/menu-api/menu-api';

import { CardListPage } from '../../card-list/card-list';
import { FecharcontaPage } from '../../fecharconta/fecharconta';
import { TableListPage } from '../table-list';

@Component({
  selector: 'page-table-list-res',
  templateUrl: 'table-list-res.html',
})
export class TableListResPage {
  public tables : any;
  public orderTable : any ;
  public k = -1;
  user = null;
  itemPrice : number = null
  firstvar : string = null
  constructor(
    public app: App,
    public navParams: NavParams,
    private menuApi: MenuApi,
    public alertCtrl: AlertController,
    public loadingController : LoadingController,
    private userSettings : UserSettings,
    public modalCtrl : ModalController,
    public toastCtrl : ToastController) {
      this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Pegando os dados...',
      dismissOnPageChange: true
     });
    loader.present();
    this.menuApi.getTables(this.user.id,this.user.id_restaurant,"R").then(data => {
      this.tables = data;
      loader.dismiss();
    });
  }

  toggleSection(i,item) {
    if (this.tables[i].avaibility==="false"){

      if(this.k !== -1){
        this.tables[this.k].open = this.tables[i].open
      }

      this.tables[i].open = !this.tables[i].open;
        if(this.tables[i].open){
          let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
           });
          loader.present();

          this.k = i ;
          this.orderTable = null;
          this.firstvar = "0";

          this.menuApi.getoredersmesa("",item.id).then(data => {
            this.orderTable = data;
            this.itemPrice =null;
            this.orderTable.forEach(item => {
              this.itemPrice = (item.quantity * item.price) + this.itemPrice;
            });
            loader.dismiss();
            if( this.itemPrice !== null){
              this.firstvar = this.itemPrice.toFixed(2)              
              }
            });
          }
      }
  }

  openTable(i,item){
    if(this.tables[i].avaibility === "false"){
      this.showAlert('Not Availible','This table is not availible ')
      this.tables[i].open = !this.tables[i].open;
      }
    }

  addorder(i,item){
    this.app.getRootNav().setRoot(CardListPage,{data : this.user , mesa : item})
  }

  showAlert(tiTle,subtitle) {
    const alert = this.alertCtrl.create({
      title: tiTle,
      subTitle: subtitle,
      buttons: ['OK']
    });
   alert.present();
  }


  AlertPedida(){
    const myModelOptions : ModalOptions ={
      enableBackdropDismiss : false , 
      showBackdrop : true 
    }
    let Modal = this.modalCtrl.create(FecharcontaPage,
       [{ user : this.user },
        {table : this.tables},
        {order : this.orderTable},
        {total : this.firstvar}],
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
      content: 'Fechando a conta..',
      dismissOnPageChange: true,
      duration : 1500
      });
    loader.present();
    this.menuApi.setPedidas(this.orderTable[0],data).then(pedida => {
        this.orderTable.forEach(order => {
          this.menuApi.setPedidasMenu(order,data,pedida).then(pedidamenu => {
            this.presentToast("Conta Fechou");
        });
      });
      this.app.getRootNav().setRoot(TableListPage,{data : this.user})
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

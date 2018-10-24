import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ModalOptions, MenuController, Platform, ToastController } from 'ionic-angular';
import { Badge } from '@ionic-native/badge';

import { MenuApi } from '../../providers/menu-api/menu-api';
import { UserSettings } from '../../providers/user-settings/user-settings';

import { OrdersPage } from '../orders/orders';
import { AlertOrderPage } from '../alert-order/alert-order';

@Component({
  selector: 'page-card-list',
  templateUrl: 'card-list.html',
})
export class CardListPage  {
  public categories : any;
  public menuType : any;
  public numberOrder: any;
  public numbernotzero : any ; 
  private user : any ;
  private table: any ;
  public k = -1;
  promotions = null;
 
  constructor(
     public navCtrl: NavController,
     private badge : Badge,
     public navParams: NavParams,
     private menuApi : MenuApi,
     public userSetttings : UserSettings,
     public loadingController: LoadingController,
     public menu : MenuController,
     public modalCtrl : ModalController,
     private toastCtrl: ToastController,
     public platform: Platform) {

  }  

  
  ionViewDidLoad() {
    this.numberOrder = 0;
    this.numbernotzero = false ;
    this.badge.set(0);

    /// test of some random promotion could be provided from the database
    this.promotions = [
      {
        id : 1,
        img : "assets/imgs/promotion.png"
      },
      {
        id : 2,
        img : "assets/imgs/loginpage.jpg"
      },
      {
        id : 3,
        img : "assets/imgs/promotion2.jpg"
      },
      {
        id : 4,
        img : "assets/imgs/cover.jpg"
      },
    ]

    let loader = this.loadingController.create({
        content: 'Pegando os dados...',
        dismissOnPageChange: true
    });
    loader.present();
    this.menuApi.getCategories().then(data => {
      this.categories = data;
      loader.dismissAll();
    });

    this.user = this.navParams.get('data')
    this.table = this.navParams.get('mesa')
  }

  ionViewWillEnter(){
    this.user = this.navParams.get('data')
  }

  toggleSection(i,item) {
    if(this.k !== -1){
    this.categories[this.k].open = this.categories[i].open}

    this.categories[i].open = !this.categories[i].open;
     if(this.categories[i].open){
      this.k = i;
      this.menuType = null;
      this.menuApi.getMenu(item.id_category).then(data => {
        this.menuType = data;
      });
     }
  }

  goOrders(){
    this.clearBadges();
    this.navCtrl.setRoot(OrdersPage,{data : this.user , mesa : this.table} );
  }

  goMenun(){
    this.menu.open();
  }

  btnAddClicked(i,j,order){
   this.showModal(order,this.user);
  }

  async increaseBadges(){
    try{
      let badge = await this.badge.increase(Number("1"));
      this.numberOrder = badge ; 
      if(this.numberOrder !== 0){
        this.numbernotzero = true;
      } else {
        this.numbernotzero = false;
      }
    }catch(e){
      console.error(e)
    }
  }

  async clearBadges(){
    try{
      let badge = await this.badge.clear();
      this.numberOrder = badge ; 
      if(this.numberOrder !== 0){
        this.numbernotzero = true;
      } else {
        this.numbernotzero = false;
      }
    }catch(e){
      console.error(e)
    }
  }

  showModal(order, user) {
    const myModelOptions : ModalOptions ={
      enableBackdropDismiss : false , 
      showBackdrop : true 
    }
    let Modal = this.modalCtrl.create(AlertOrderPage,{ data : order }, myModelOptions);
    Modal.onDidDismiss(data => {
      if (data !== undefined){
        this.userSetttings.setorder(user,order,data,this.table).then(() => {
          this.increaseBadges(); 
          this.presentToast(order.name + " foi adquirido")
        }).catch(e=> console.log(e))
      }
    })
    Modal.present();
 }

 presentToast(mensagem) {
  const toast = this.toastCtrl.create({
    message: mensagem,
    duration: 2000
  });
  toast.present();
}




}

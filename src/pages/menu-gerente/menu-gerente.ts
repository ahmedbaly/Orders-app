import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CardListGerente } from '../card-list-gerente/card-list-gerente';
import { QrcreatorPage } from '../qrcreator/qrcreator';
import { MesasGerentePage } from '../mesas-gerente/mesas-gerente';
import { ConfigGerentePage } from '../config-gerente/config-gerente';



@Component({
  selector: 'page-menu-gerente',
  templateUrl: 'menu-gerente.html',
})
export class MenuGerentePage {
  public items :any ; 
  public user :any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menu : MenuController
            ) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('data')

    /// Random menu's modules could be provided from the database 
    this.items  = [
      {
        id : 1,
        name : "MESAS",
        icon : "grid"
      },
      {
        id : 2,
        name : "CARDAPIO",
        icon : "book"
      },
      {
        id : 3,
        name : "CONFIGURAÇÕES",
        icon : "settings"
      },
      {
        id : 4,
        name : "QR Code",
        icon : "qr-scanner"
      }
  ]
  }

  ionViewWillEnter(){
    this.user = this.navParams.get('data')
  }


  itemSelected(menuitem){
    if(menuitem.name ==='MESAS'){
      this.navCtrl.setRoot(MesasGerentePage, {data : this.user})
    }else if(menuitem.name ==='CARDAPIO'){
      this.navCtrl.push(CardListGerente)
    }else if(menuitem.name ==='QR Code'){
      this.navCtrl.push(QrcreatorPage, {data : this.user})
    }else if(menuitem.name ==='CONFIGURAÇÕES'){
      this.navCtrl.push(ConfigGerentePage, {data : this.user})
    }
  }

  goMenun(){
    this.menu.open();
  }

  

}

import { Component } from '@angular/core';
import { load } from 'google-maps';
import { NavParams, AlertController, LoadingController, App } from 'ionic-angular';

import { MenuApi } from '../../../providers/menu-api/menu-api';

import { CardListPage } from '../../card-list/card-list';


@Component({
  selector: 'page-table-list-dispo',
  templateUrl: 'table-list-dispo.html',
})
export class TableListDispoPage {
  public tables : any;
  public orderTable : any ;
  public k = -1;
  user = null;

  constructor(
    public app: App,
    public navParams: NavParams,
    private menuApi: MenuApi,
    public alertCtrl: AlertController,
    public loadingController : LoadingController) {
      this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Pegando os dados...',
      dismissOnPageChange: true
     });
    loader.present();
    this.menuApi.getTables(this.user.id,this.user.id_restaurant,"D").then(data => {
      this.tables = data;
      loader.dismiss();
    });
  }

  toggleSection(i,item) {
    if (this.tables[i].avaibility==="true"){
      this.tables[i].open = !this.tables[i].open;
      if(this.tables[i].open){
        this.showAlert('Mesa disponivel','Essa mesa e disponivel, você pode pedir!')  
        this.tables[i].open = !this.tables[i].open;    
      }      
    }
 }

  openTable(i,item){
    if(this.tables[i].avaibility === "true"){
      this.tables[i].open = !this.tables[i].open;
      this.app.getRootNav().setRoot(CardListPage,{data : this.user , mesa : item})
      }
    }

  showAlert(tiTle,subtitle) {
    const alert = this.alertCtrl.create({
      title: tiTle,
      subTitle: subtitle,
      buttons: ['OK']
    });
   alert.present();
  }

}

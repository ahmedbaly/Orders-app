import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { MenuApi } from '../../../providers/menu-api/menu-api';


@Component({
  selector: 'page-mesastabelas',
  templateUrl: 'mesas-tabelas.html',
})
export class MesasTabelas {
  user : any ;
  mesas: any  =null;
  orders :any =null ; 
  public k = -1;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuApi : MenuApi,
    public loadingController : LoadingController) {
    this.user = navParams.data
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Pegando os dados...',
      dismissOnPageChange: true
    });
    loader.present();
    this.menuApi.getMesasGarcao("T",this.user.id_restaurant,this.user.id_restaurant).then(data => {
        this.mesas= data; 
    })

    this.menuApi.getoredersmesa("G",this.user.id_restaurant).then(data => {
      this.orders = data;
      loader.dismiss();
    })
  }

  toggleSection(i,item){
    if(this.k !== -1){
      this.mesas[this.k].open = this.mesas[i].open}
  
    this.mesas[i].open = !this.mesas[i].open;
    if(this.mesas[i].open){
        this.k = i;
        this.orders = null;
    }
  }


}

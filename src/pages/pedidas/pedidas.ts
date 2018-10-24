import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuApi } from '../../providers/menu-api/menu-api';

@Component({
  selector: 'page-pedidas',
  templateUrl: 'pedidas.html',
})
export class PedidasPage {
  public user : any ;
  public table : any ; 
  public pedidas : any = null ;
  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public menuApi : MenuApi) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('data')

    this.menuApi.getpedidas(this.user.id).then(data => {
      this.pedidas = data;
    });
  }

}

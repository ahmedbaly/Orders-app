import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MesasGarcao } from './mesas-gerente-garcao/mesas-garcao';
import { MesasTabelas } from './mesas-gerente-tabelas/mesas-tabelas';
import { MenuGerentePage } from '../menu-gerente/menu-gerente';


@Component({
  selector: 'page-mesas-gerente',
  templateUrl: 'mesas-gerente.html',
})
export class MesasGerentePage {
  user : any ;
  tab1Root: any ;
  tab2Root : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('data')
    this.tab1Root = MesasGarcao;
    this.tab2Root = MesasTabelas;
  }

  ionViewDidLoad() {
  }

  goHome(){
    this.navCtrl.setRoot(MenuGerentePage,{data : this.user})
}



}

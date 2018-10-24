import { Component } from '@angular/core';
import { NavController, NavParams, MenuController} from 'ionic-angular';

import { CardListPage } from '../card-list/card-list';
import { TableListDispoPage } from './table-list-dispo/table-list-dispo';
import { TableListResPage } from './table-list-res/table-list-res';


@Component({
  selector: 'page-table-list',
  templateUrl: 'table-list.html',
})
export class TableListPage {
  user = null;
  tab1Root: any ;
  tab2Root : any ;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu : MenuController) {
      this.user = this.navParams.get('data')
      this.tab1Root = TableListDispoPage;
      this.tab2Root = TableListResPage;
  }

  ionViewWillEnter(){
    this.user = this.navParams.get('data')
  }

  goMenu(){
   this.menu.open();
  }

}

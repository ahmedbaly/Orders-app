import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Network} from '@ionic-native/network'
import { Platform } 			from 'ionic-angular';

import { UserSettings } from '../../providers/user-settings/user-settings';
import { MenuApi } from '../../providers/menu-api/menu-api';

import { TableListPage } from '../table-list/table-list';
import { MenuGerentePage } from '../menu-gerente/menu-gerente';
import { QRScannerPage } from '../qrscanner/qrscanner';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public login : any ; 
  public password : any ; 
  public user : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events : Events,
              private alertCtrl : AlertController,
              private menuApi: MenuApi,
              private userSettings : UserSettings,
              private platform : Platform,
              private network : Network
              ) {
  }

  signin(){
    this.menuApi.Authentication(this.login,this.password).then( res => {
      this.user = res[0] ;

      if(this.user) {
        this.createUser(this.user);
        this.userSettings.setTableUser(this.user);

        if (this.user.usertype === "cliente"){
            this.navCtrl.setRoot(QRScannerPage,{data : this.user});
        }

        else if (this.user.usertype ==="garcao"){
            if (this.user.Rest_block ==="N"){
                alert("voce nao pode connectar, verifica com o gerente")
            } else{
              this.navCtrl.setRoot(TableListPage,{data : this.user})}
        } 
        
        else if (this.user.usertype === "gerente"){
          this.navCtrl.setRoot(MenuGerentePage,{data : this.user})
          }
        } 
        else {
        this.showAlert("Verifique a senha ou o login por favor")
      }
    })
  }

  showAlert(content) {
    const alert = this.alertCtrl.create({
      title: 'Request failed!',
      subTitle: content,
      buttons: ['OK']
    });
   alert.present();
  }
  
  createUser(user) {
    this.events.publish('user:created', user);
  }    

  CheckConnectivity() {
    this.platform.ready().then(() => {
      // if no internet, notice is a string
      if (this.network.type == 'none' ) { 
        alert('você está sem internet, verifique por favor');
      } else {
        this.signin();
      }
    })
  }

}

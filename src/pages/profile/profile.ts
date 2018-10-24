import { Component } from '@angular/core';
import { NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { MenuApi } from '../../providers/menu-api/menu-api';
import { UserSettings } from '../../providers/user-settings/user-settings';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public users : any;
  public name : any ; 
  public usertype : any ;
  public email : any;
  public endereco : any;
  public cidade : any;
  public cellular : any;
  public alterar:boolean ;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public menuApi : MenuApi,
      public events : Events,
      private userSettings : UserSettings,
      private toastCtrl : ToastController) {
        this.users = this.navParams.data;
    }

  ionViewDidLoad() {
    this.alterar  = false ;
    this.insertStandardinfo();
  }


  ionViewWillLeave(){
    this.navCtrl.getPrevious().data = this.users;
  }

  alterarinfo(){
    this.alterar = !this.alterar ;
    this.insertStandardinfo();
  }

  insertStandardinfo(){
    this.name = this.users.name;
    this.usertype = this.users.usertype;
    this.email = this.users.email;
    this.endereco = this.users.endereco;
    this.cidade = this.users.cidade;
    this.cellular = this.users.cellular;
  }

  save(){
    this.menuApi.updateProfil(this.users,{ name : this.name ,
       usertype : this.usertype, 
       email : this.email,
       endereco : this.endereco,
       cidade : this.cidade,
       cellular : this.cellular
      }).then( (pedida) => {
        this.updateprofilinfo();
        this.alterar = !this.alterar ;
    });
  }

  updateprofilinfo(){
    this.users.name = this.name ;
    this.users.usertype = this.usertype;
    this.users.email = this.email;
    this.users.endereco = this.endereco;
    this.users.cidade = this.cidade;
    this.users.cellular = this.cellular;

    this.userSettings.updateUserinfo(this.users).then(data => {
      this.createUser(this.users)
      this.presentToast() ;
    })
    .catch(e =>{console.log(e)})
  }

  createUser(user) {
    this.events.publish('user:created', user);
  }
  
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Perfil alterado com succeso',
      duration: 2000
    });
    toast.present();
  }
}

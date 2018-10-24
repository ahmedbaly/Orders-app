import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Keyboard, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserSettings } from '../providers/user-settings/user-settings';


import { TableListPage } from '../pages/table-list/table-list';
import { ProfilePage } from '../pages/profile/profile';
import { ContatenosPage } from '../pages/contatenos/contatenos';
import { LoginPage } from '../pages/login/login';
import { PedidasPage } from '../pages/pedidas/pedidas';

@Component({
  templateUrl: 'app.html',
  selector: 'app-page',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  public user : any ;
  public Name : any ; 
  public login : any;
  public password : any;
  public usertype : any ; 
  public gerente : boolean = false ;
  public cliente : boolean = false ; 
  public garcao : boolean = false ; 

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard : Keyboard,
    public events : Events,
    public alertCtrl: AlertController,
    private userSettings : UserSettings) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
    ];

    this.listenToLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.userSettings.initStorage().then( () => this.rootPage = LoginPage)
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  listenToLoginEvents(){
    setTimeout(() => {
    this.events.subscribe('user:created', (userEventData) => {
        console.log('Welcome', userEventData)
        this.user = userEventData;
        this.Name = userEventData.name ; 
        this.login = userEventData.login;
        this.password  =  userEventData.password;
        this.usertype =userEventData.usertype;

        switch(this.usertype){
          case 'gerente':
            this.gerente = true;
          break;
          case 'garcao' :
            this.garcao = true;
          break;
          case 'cliente':
            this.cliente = true;
          break;

        }
    });
  }, 1000);
 }


 goProfil(){
  let page = this.nav.push(ProfilePage,this.user);
 }
 
 goMenu(){
  this.nav.popToRoot();
}

goMesas(){
  this.nav.setRoot(TableListPage , {data : this.user});
}

 goGarcao(){
  this.showAlertGarcao("garcao");
}

goOrders(){
  this.nav.push(PedidasPage, {data : this.user});
}

goContactus(){
  this.nav.push(ContatenosPage);
}

goDeconnection(){
  this.showAlertSaida();
}


async showAlertGarcao(title) {
  console.log("cssClass")  

  const confirm = this.alertCtrl.create({
    title: 'Chamar o garção',
    message: 'Confirma a chamada do garção ?',
    cssClass:'buttonCss',
    buttons: [
      {
        text: 'Não',
        role: 'cancel',
        cssClass: 'cancel-button',
        handler: () => {
          console.log('Disagree clicked');
        }
      }, {
        text: 'Sim',
        cssClass: 'exit-button',
        handler: () => {
          console.log('Disagree clicked');
      }
     }
    ]
  });
 await confirm.present();
}


async showAlertSaida() {
  const confirm = this.alertCtrl.create({
      title: 'Log out',
    message: 'Confirma saida?',
    buttons: [
      {
        text: 'Não',
        handler: () => {
          console.log('Disagree clicked');
        }
      }, {
        text: 'Sim',
        handler: () => {
          this.nav.setRoot(LoginPage);
      }
     }
    ]
  });
 await confirm.present();
}


}

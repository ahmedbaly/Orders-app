import { Component} from '@angular/core';
import { NavController, NavParams,  MenuController, ModalOptions, ModalController, AlertController, ToastController, LoadingController  } from 'ionic-angular';


import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CardListPage } from '../card-list/card-list';
import { MenuApi } from '../../providers/menu-api/menu-api';
import { AlertOrderPage } from '../alert-order/alert-order';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { DescriptionAlertPage } from '../description-alert/description-alert';
import { UserSettings } from '../../providers/user-settings/user-settings';


@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})

export class QRScannerPage {
  id_restaurant = null;
  user = null;
  qrData = null;
  createdCode = null;
  scannedCode = null;
  promotions = null ;
  promotions1 = null ;
  k = -1 ;
  selectoptions = null;

  constructor(
    public menu : MenuController,
    private navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private menuApi : MenuApi,
    private modalCtrl : ModalController,
    private alertCtrl : AlertController,
    private nativePageTransitions: NativePageTransitions,
    private userSettings : UserSettings,
    private toastCtrl : ToastController,
    private loadingController : LoadingController) {
    }

  ionViewDidLoad() { 
    this.user = this.navParams.get('data')

    this.promotions = [
      {
        id: 1,
        img : "assets/imgs/rest7.jpg",
        name : "House Vision",
        description : "Le Carpe Diem - il se résume en quelques mots:  comptoir, resto, dj set, musique live, convivialité, éclectisme, originalité ... "
      },{
        id: 2,
        img : "assets/imgs/rest8.jpg",
        name : "Isabel Marant",
        description : "Nossos clientes são incríveis!!! Sente a vibe!!! ❤️👏 E hoje, a partir das 16h, tem a famosa Roda de Samba do @deitaerolaoficial + Dj! Pode chegar! Já estamos abertos! 😎 "
      },{
        id: 3,
        img : "assets/imgs/rest10.jpg",
        name : "M'EAT",
        description : "Nossos clientes são incríveis!!! Sente a vibe!!! E hoje, a partir das 16h, tem a famosa Roda de Samba"

      },{
        id: 4,
        img : "assets/imgs/rest11.jpg",
        name : "Mishiguene",
        description : "hoje, a partir das 16h, tem a famosa Roda de Samba! Le Carpe Diem - il se résume en quelques mots:  comptoir, resto, dj set, musique live, convivialité, éclectisme, originalité .."
      }
    ]

    this.promotions1 = [
      {
        id: 1,
        img : "assets/imgs/rest7.jpg",
        name : "House Vision",
        description : "Le Carpe Diem - Tunis se résume en quelques mots:  comptoir, resto, dj set, musique live, convivialité, éclectisme, originalité ... "
      },{
        id: 2,
        img : "assets/imgs/rest8.jpg",
        name : "Isabel Marant",
        description : "Nossos clientes são incríveis!!! Sente a vibe!!! ❤️👏 E hoje, a partir das 16h, tem a famosa Roda de Samba do @deitaerolaoficial + Dj! Pode chegar! Já estamos abertos! 😎 "
      },{
        id: 3,
        img : "assets/imgs/rest9.jpg",
        name : "Yu I-Cafe",
        description : "ESGOTADO🚫 Acabou o primeiro lote pro Lual da Laje no dia 07/09 com @arlindinhooficial e participação especial do @grupopiquenovo. Corre pra não ficar de fora dessa!"
      },{
        id: 4,
        img : "assets/imgs/rest10.jpg",
        name : "M'EAT",
        description : "Nossos clientes são incríveis!!! Sente a vibe! participação especial do @grupopiquenovo. Corre pra não ficar de fora dessa!"

      },{
        id: 5,
        img : "assets/imgs/rest11.jpg",
        name : "Mishiguene",
        description : "Le Carpe Diem - il se résume en quelques mots:  comptoir, resto, dj set, musique live, convivialité, éclectisme ESGOTADO🚫 Acabou o primeiro lote pro Lual"
      },
      {
        id: 6,
        img : "assets/imgs/rest1.jpg",
        name : "   Garden Bless  ",
        description : "Le Carpe Diem - Tunis se résume en quelques mots:  comptoir, resto, dj set, musique live, convivialité, éclectisme, originalité ... "
      },{
        id: 7,
        img : "assets/imgs/rest2.jpg",
        name : "      Embar      ",
        description : "Nossos clientes são incríveis!!! Sente a vibe!!! ❤️👏 E hoje, a partir das 16h, tem a famosa Roda de Samba do @deitaerolaoficial + Dj! Pode chegar! Já estamos abertos! 😎 "
      },{
        id: 8,
        img : "assets/imgs/rest3.jpg",
        name : "      Galaxy     ",
        description : "ESGOTADO🚫 Acabou o primeiro lote pro Lual da Laje no dia 07/09 com @arlindinhooficial e participação especial do @grupopiquenovo. Corre pra não ficar de fora dessa!"
      },{
        id: 9,
        img : "assets/imgs/rest4.jpg",
        name : "     Prezzo      ",
        description : "Le Carpe Diem - il se résume en quelques mots:  comptoir, resto, dj set, musique live, convivialité, éclectisme, originalité .."

      },{
        id: 10,
        img : "assets/imgs/rest5.jpg",
        name : "The Brew Brothers",
        description : "SGOTADO🚫 Acabou o primeiro lote pro Lual da Laje no dia 07/09 com @arlindinhooficial e participação especial Nossos clientes são incríveis!!! Sente a vibe!! "
      }
    
    ]
  }

  ionViewWillEnter(){
    this.user = this.navParams.get('data')
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.QRcodeComparator(this.scannedCode);
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  QRcodeComparator (code) {
    let result = null;
    this.menuApi.getQRcode(code).then(data => {
      result = data[0] ;
        if (result.qrCode === code){
          this.id_restaurant = result.id;
            let loader = this.loadingController.create({
              content: 'Pegando os dados...',
              dismissOnPageChange: true
            });
            loader.present();
              this.menuApi.getTables(this.user.id,this.id_restaurant,"T").then( returno =>{ 
                if(Object.keys(returno).length !== 0){
                  loader.dismiss();
                  this.navCtrl.setRoot(CardListPage,{data : this.user , mesa : returno[0]}) 
                }else {
                 this.menuApi.getTables(0,this.id_restaurant,"C").then( data =>{ 
                  this.selectoptions = data ;
                  loader.dismiss();
                  this.addTable(this.selectoptions);
                })  
              }
            });
        }else {
          alert("QRcode ta errado")
        }
      });
  }

  addTable(selectoption){
    let alerte = this.alertCtrl.create() ;

    selectoption.forEach(element => {
        alerte.addInput({
          type: 'radio',
          label: element.numTable,
          value: element,
        });
      });
      alerte.setTitle('Addicionar mesa');
      alerte.addButton({
        text: 'Não',
        role: 'cancel',
        handler: data => {
        }});
      alerte.addButton({
        text: 'Sim',
        handler: returno => {
          this.user.id_restaurant = this.id_restaurant;
          let result = returno
          this.navCtrl.setRoot(CardListPage,{data : this.user , mesa : returno })   
        }
      });
      alerte.present();
    }


  profil(){
    this.menu.open();
  }

  openCard(i,item){
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 500
     };
 
    this.nativePageTransitions.fade(options);

    const myModelOptions : ModalOptions ={
      enableBackdropDismiss : false , 
      showBackdrop : true 
    }
    let Modal = this.modalCtrl.create(DescriptionAlertPage,{ data : item}, myModelOptions);
    Modal.onDidDismiss(data => {
     
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

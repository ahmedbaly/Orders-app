import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MenuApi } from '../../providers/menu-api/menu-api';

import { CardListGerente } from '../card-list-gerente/card-list-gerente';
import { MenuGerentePage } from '../menu-gerente/menu-gerente';

@Component({
  selector: 'page-qrcreator',
  templateUrl: 'qrcreator.html',
})
export class QrcreatorPage {
  public user :any ;
  qrData = null;
  createdCode = null;
  scannedCode = null;

  constructor(private barcodeScanner: BarcodeScanner,
              private alertCtrl : AlertController, 
              private menuApi : MenuApi,
              private navParams : NavParams,
              public navCtrl: NavController,
              private toastCtrl: ToastController) { }

  ionViewDidLoad() { 
    this.user = this.navParams.get('data')
  }

 
  createCode() {
    this.createdCode = this.qrData; 
    this.scannedCode = null;
  }
 
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.createdCode = null;
      this.scannedCode = barcodeData.text;
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  sincronizacao(){
     let alert = this.alertCtrl.create({
      title: 'Certeza ? ',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: handlerdata => handlerdata
        },
        {
          text: 'Sim',
          handler: handlerdata => {
            this.menuApi.setQrCode(this.user.id,this.createdCode)
            .then(res => {
              this.presentToast("O code e sincronizado com succeso");
              this.navCtrl.setRoot(MenuGerentePage , {data : this.user})
            });
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }
 
}
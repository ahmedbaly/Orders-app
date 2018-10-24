import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MenuApi } from '../../../providers/menu-api/menu-api';
import { MenuGerentePage } from '../../menu-gerente/menu-gerente';


@Component({
  selector: 'page-mesasgarcao',
  templateUrl: 'mesas-garcao.html',
})
export class MesasGarcao {
    user : any ;
    listaOpened : boolean = true;
    garcaoes :any  =null;
    mesas: any  =null;
    orders :any =null ; 
    public k = -1;
    public garcaoname = null; 
  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private menuApi: MenuApi,
            private alertCtrl: AlertController,
            private toastCtrl: ToastController ) {    
    this.user = navParams.data
  }
  
  ionViewDidLoad() {
    this.getGarcaoes();
    this.getMesasGarcao();
  }

  getGarcaoes(){
    this.menuApi.getGarcaoes("S",this.user.id_restaurant).then(data => {
        this.garcaoes = data;
    })
  }

  getMesasGarcao(){
    this.menuApi.getMesasGarcao("G",this.user.id_restaurant, "1").then(data => {
      this.mesas= data;
   })
  }

  addTable(garcao){
    if (garcao.rest_block==='S'){
      let alerte = this.alertCtrl.create({
        title: 'Addicionar mesa',
        inputs: [
          {
            name: 'numero',
            placeholder: 'nùmero mesa',
            type : 'number'
          },
        ],
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: data => {
            }
          },
          {
            text: 'Sim',
            handler: returno => {
              this.menuApi.setTable(garcao.id,this.user.id_restaurant,returno.numero ).then(data => {
                if(data=== '1'){
                  alert("voce nao pode affeitar uma mesa para um usuario bloqueado");
                }else if(data=== '2'){
                  alert("essa mesa e jà affeitada");
                } else if(data=== '3'){
                  this.getMesasGarcao();
                  this.presentToast("Mesa adicionada com sucesso")
                }                
            }).catch(e=> { 
              console.log("ERRORR" , e)
            })
            }
          }
        ]
      });
      alerte.present();
    }
  }

  deleteMesa(mesa){
    if(mesa.avaibility==="false"){
      alert("voce nao pode exluir uma mesa resavada")
    }else{
      let alerte = this.alertCtrl.create({
        title: 'Excluir mesa',
        subTitle : 'Clica sim para excluir essa mesa',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: data => {
            }
          },
          {
            text: 'Sim',
            handler: returno => {
              this.menuApi.deleteTable(mesa.id ).then(data => {
                  this.getMesasGarcao();
                  this.presentToast("Mesa exluida com sucesso")
            }).catch(e=> { 
              console.log("ERRORR" , e)
            })
            }
          }
        ]
      });
      alerte.present();
    }
  }



  goHome(){
      this.navCtrl.setRoot(MenuGerentePage,{data : this.user})
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }



}

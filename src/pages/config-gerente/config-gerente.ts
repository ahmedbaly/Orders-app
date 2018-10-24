import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MenuApi } from '../../providers/menu-api/menu-api';


@Component({
  selector: 'page-config-gerente',
  templateUrl: 'config-gerente.html',
})
export class ConfigGerentePage {
  items : any ;  
  user :any = null ; 
  i = -1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuApi: MenuApi,
    public alertCtrl : AlertController,
    public toastCtrl : ToastController) {

  }

  ionViewDidLoad() {
    this.user = this.navParams.get('data')
    this.getGarcoes();
  }

  getGarcoes(){
    this.i = -1;
    this.menuApi.getGarcaoes("S",this.user.id_restaurant).then(data => {
      this.items = data ;
      this.items.forEach(element => {
        this.i++;
        if(element.rest_block==='S'){
          this.items[this.i].open = true ;
        } else if (element.rest_block==='N'){
          this.items[this.i].open = false ;
      }
    })
  })
  }

  reverse(i,item){
    let status = null;
    if (item.open){status = "S" }
    else {status = "N"}
    this.menuApi.setGarcaoesAcesso(this.user.id_restaurant,item.id,status).then(data =>{
      if(status==="N"){
        this.presentToast(item.name +" e bloquiado")
      }else if (status ==='S'){
        this.presentToast(item.name + " e liberado")
      }
    })
  }

  addusuario(){
    let alerte = this.alertCtrl.create({
      title: 'Addicionar novo usuario',
      subTitle: 'entra os informacoes aqui',
      inputs: [
        {
          name: 'name',
          placeholder: 'nome',
          type : 'text',
          
          min : 1,
          max : 50
        },{
          name: 'login',
          placeholder: 'login',
          type : 'text',
          min : 1,
          max : 20
        },
        {
          name: 'password',
          placeholder: 'senha',
          type : 'password',
          min : 1,
          max : 50
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
            this.menuApi.checklogin(returno.login).then(data => {
              if(data[0].Column1 === 0){
                this.menuApi.addGarcao(this.user.id_restaurant,returno.name,returno.login,returno.password)
                .then(data => {
                    this.getGarcoes();
                    this.presentToast(returno.name +": Nova conta e criada")
                  })
                .catch(e=> { 
                  console.log("ERRORR" , e)
                  })
              } 
              else {
                alert("login nao e unico, troca-lhe por fovaor")
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
  
  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,ModalOptions, AlertController } from 'ionic-angular';
import { MenuApi } from '../../providers/menu-api/menu-api';

@Component({
  selector: 'page-card-list-gerente',
  templateUrl: 'card-list-gerente.html',
})
export class CardListGerente {
  public categories : any ;
  public menuType : any;
  public itemCategory : any ;
  listaOpened : boolean = true;
  categorynamelista : any = null;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public modalCtrl : ModalController,
      private alertCtrl : AlertController,
      public menuApi : MenuApi) {
  }

  ionViewDidLoad() {
   this.getCategoria();
  }

  getCategoria(){
    this.menuApi.getCategories().then(data => {
      this.categories = null;
      this.categories = data;
    });
  }

  addCategory(){
    let alert = this.alertCtrl.create({
      title: 'Categoria',
      inputs: [
        {
          name: 'categoria',
          placeholder: 'coloca uma categoria',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Entrar',
          handler: data => {
            console.log(data)
            this.sendCategoria(data);
          }
        }
      ]
    });
    alert.present();
  }

  sendCategoria(data){
    this.menuApi.sendCategoria(data).then(data => {
      this.getCategoria();
    });
  }

  deleteCategoria(item){
    let alert = this.alertCtrl.create({
      title: 'Certeza ? ',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.menuApi.deleteCategoria(item).then(data => {
              this.getCategoria();
            });
          }
        }
      ]
    });
    alert.present();
  }

  toggleSection(i,item){
   this.itemCategory= item;
   this.listaOpened = !this.listaOpened;
      if(!this.listaOpened){
        this.getMenutype(item);
    }
  }

  getMenutype(item){
    this.menuType = null;
    this.menuApi.getMenu(item.id_category).then(data => {
    this.menuType = data;
    this.categorynamelista = item.categoryname;
  });
  }

  backtocategory(){
    this.listaOpened = !this.listaOpened;
  }
  
  addmenutype(){
    let alert = this.alertCtrl.create({
      title: 'Addicionar ',
      inputs: [
        {
          name: 'name',
          placeholder: 'nome'
        },
        {
          name: 'description',
          placeholder: 'descrição',
        },
        {
          name: 'price',
          placeholder: 'preço',
        }
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
          handler: data => {
            this.menuApi.sendMenuType(data,this.itemCategory).then(data => {
              this.getMenutype(this.itemCategory);
            });
          }
        }
      ]
    });
    alert.present();
  }

  deleteMenuType(item){
    let alert = this.alertCtrl.create({
      title: 'Certeza ? ',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.menuApi.deleteMenuType(item).then(data => {
              console.log('delete Menutype',data)
              this.getMenutype(this.itemCategory);
            });
          }
        }
      ]
    });
    alert.present();
  }

}

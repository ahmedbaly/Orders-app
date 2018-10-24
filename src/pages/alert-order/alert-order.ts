import { Component } from '@angular/core';
import {NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { WheelSelector } from '@ionic-native/wheel-selector';

@Component({
  selector: 'page-alert-order',
  templateUrl: 'alert-order.html',
})
export class AlertOrderPage {
  public quantity : any;
  public data : any ;
  public name : any;
  public description : any;
  public price: any ; 
  public description_order ="";
  public total : any;
  public isKeyboardHide = true;
  public numbers = null ;

  constructor(
    private navParams: NavParams, 
    public viewCtrl: ViewController,
    private selector : WheelSelector,
    private keybord : Keyboard
   ) {
    keybord.onKeyboardShow().subscribe(() => {
        setTimeout(() => { // this to make sure that angular's cycle performed and the footer removed from the DOM before resizing
        this.isKeyboardHide = false;
      }, 100);
   });
   
   keybord.onKeyboardHide().subscribe(() => {
        setTimeout(() => { // this to make sure that angular's cycle performed and the footer removed from the DOM before resizing
        this.isKeyboardHide = true;
      }, 100);
   });
  }


  ionViewWillLoad() {
    this.quantity = 1 ; 
    this.data = this.navParams.get('data')
    this.name = this.data.name;
    this.description = this.data.description;
    this.price = this.data.price;
    this.total = this.price;

    this.numbers = [
     { description: "1" },
     { description: "2" },
     { description: "3" },
     { description: "4" },
     { description: "5" },
     { description: "6" },
     { description: "7" },
     { description: "8" },
     { description: "9" },
     { description: "10" },
     { description: "11" },
     { description: "12" },
     { description: "13" },
     { description: "14" },
     { description: "15" },
     { description: "16" },
     { description: "17" },
     { description: "18" },
     { description: "19" },
     { description: "20" }
   ]


  }

  clicktoOrder(){
    const order = [ {
      quantity : this.quantity,
      description : this.description_order,
    }]
    this.viewCtrl.dismiss(order);
  }

  clickback(){
    this.viewCtrl.dismiss();
  }
    
  getTotal(quantidade){
    this.total = quantidade * this.price;
  }

  increaseQuantity(){
    this.selector.show({
      title: "Quanto ?",
      positiveButtonText: 'sim',
      negativeButtonText :'cancelar' ,
      items: [
        this.numbers
      ],
    }).then(
      result => {
        this.quantity = result[0].description;
        this.getTotal(this.quantity)
      },
      err => console.log('Error: ', err)
      );
  }

}

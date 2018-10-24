import { Component } from '@angular/core';
import {NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-description-alert',
  templateUrl: 'description-alert.html',
})
export class DescriptionAlertPage {
  public quantity : any;
  public data : any ;
  public name : any;
  public description : any;
  public img: any ; 
  public isKeyboardHide = true;

  constructor(
    private navParams: NavParams, 
    public viewCtrl: ViewController,
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
    this.data = this.navParams.get('data')
    this.name = this.data.name;
    this.description = this.data.description;
    this.img = this.data.img;

  }

  toGo(){
    /// module underconstruction
  }

  clickback(){
    this.viewCtrl.dismiss();
  }
    

}

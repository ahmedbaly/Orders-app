import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-contatenos',
  templateUrl: 'contatenos.html',
})
export class ContatenosPage {
  public email : any ; 
  public pergunta : any ; 
  public isKeyboardHide = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public emailComposer : EmailComposer,
    private keybord : Keyboard) {

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

  Eviaremail(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     }).catch(e => {
       console.log(e);
     });
     
     let email = {
       from : this.email ,
       to: 'ahmedbaly.15@gmail.com',
      //  cc: 'exemple@exemple.com',
       subject: 'Contact Us',
       body: this.pergunta,
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email).then(data => {
      if(data==="OK"){
        this.viewCtrl.dismiss()
      }
     });
  }

}

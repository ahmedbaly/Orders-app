import { BrowserModule }                    from '@angular/platform-browser';
import { ErrorHandler, NgModule }           from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }                       from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp }                                    from './app.component';
import { GoogleMapComponent }                       from '../components/google-map/google-map';
import { NgxQRCodeModule}                           from 'ngx-qrcode2';

import { NativePageTransitions }  from '@ionic-native/native-page-transitions';
import { StatusBar }              from '@ionic-native/status-bar';
import { SplashScreen }           from '@ionic-native/splash-screen';
import { WheelSelector }          from '@ionic-native/wheel-selector';
import { QRScanner}               from '@ionic-native/qr-scanner';
import { BarcodeScanner }         from '@ionic-native/barcode-scanner';
import { EmailComposer }          from '@ionic-native/email-composer';
import { Network }                from '@ionic-native/network';
import { Keyboard }               from '@ionic-native/keyboard';
import { Badge }                  from '@ionic-native/badge';
import { SQLite }                 from '@ionic-native/sqlite';
import { IonicStorageModule }     from '@ionic/Storage';

import { MenuApi}       from '../providers/menu-api/menu-api';
import { SqlStorage }   from '../providers/sql-storage/sql-storage';
import { UserSettings } from '../providers/user-settings/user-settings';

// import { AngularFireModule} from 'angularfire2';
// import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { OrdersPage }           from '../pages/orders/orders';
import { TableListPage }        from '../pages/table-list/table-list';
import { LoginPage }            from '../pages/login/login';
import { MenuGerentePage }      from '../pages/menu-gerente/menu-gerente';
import { AlertOrderPage }       from '../pages/alert-order/alert-order';
import { ProfilePage }          from '../pages/profile/profile';
import { ContatenosPage }       from '../pages/contatenos/contatenos';
import { CardListPage }         from '../pages/card-list/card-list';
import { QRScannerPage }        from '../pages/qrscanner/qrscanner';
import { CardListGerente }      from '../pages/card-list-gerente/card-list-gerente';
import { QrcreatorPage }        from '../pages/qrcreator/qrcreator';
import { MesasGerentePage }     from '../pages/mesas-gerente/mesas-gerente';
import { MesasGarcao }          from '../pages/mesas-gerente/mesas-gerente-garcao/mesas-garcao';
import { MesasTabelas }         from '../pages/mesas-gerente/mesas-gerente-tabelas/mesas-tabelas';
import { ConfigGerentePage }    from '../pages/config-gerente/config-gerente';
import { TableListDispoPage }   from '../pages/table-list/table-list-dispo/table-list-dispo';
import { TableListResPage }     from '../pages/table-list/table-list-res/table-list-res';
import { OrdersComPage }        from '../pages/orders/orders-commanded/orders-com';
import { OrdersToPage }         from '../pages/orders/orders-to-command/orders-to';
import { DescriptionAlertPage } from '../pages/description-alert/description-alert';
import { FecharcontaPage }      from '../pages/fecharconta/fecharconta';
import { PedidasPage }          from '../pages/pedidas/pedidas';


@NgModule({
  declarations: [
    MyApp,
    CardListPage,
    OrdersPage,
    OrdersComPage,
    OrdersToPage,
    TableListPage,
    TableListDispoPage,
    TableListResPage,
    LoginPage,
    MenuGerentePage,
    AlertOrderPage,
    ProfilePage,
    ContatenosPage,
    QRScannerPage,
    CardListGerente,
    QrcreatorPage,
    MesasGerentePage,
    MesasGarcao,
    MesasTabelas,
    ConfigGerentePage,
    DescriptionAlertPage,
    GoogleMapComponent,
    FecharcontaPage,
    PedidasPage
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    NgxQRCodeModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      scrollAssist: false, 
      autoFocusAssist: false
  }),


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardListPage,
    OrdersPage,
    OrdersComPage,
    OrdersToPage,
    TableListPage,
    TableListDispoPage,
    TableListResPage,
    LoginPage,
    MenuGerentePage,
    AlertOrderPage,
    ProfilePage,
    ContatenosPage,
    QRScannerPage,
    CardListGerente,
    QrcreatorPage,
    MesasGerentePage,
    MesasGarcao,
    MesasTabelas,
    ConfigGerentePage,
    DescriptionAlertPage,
    GoogleMapComponent,
    FecharcontaPage,
    PedidasPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WheelSelector,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuApi,
    IonicStorageModule,
    Badge,
    SqlStorage,
    SQLite,
    QRScanner,
    EmailComposer,
    UserSettings,
    BarcodeScanner ,
    QRScanner,
    Network,
    Keyboard,
    NativePageTransitions
  ]
})
export class AppModule {}

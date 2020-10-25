import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

import { CookieService } from './services/cookie.service'; // Service de armazenamento local
import { AuthService } from './services/auth.service'; // Service de autenticação
import { EventsService } from './services/events.service'; // Importa service de eventos globais

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  userData: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    // 1.3) Inicializa dependências
    public cookie: CookieService, // armazenamento local
    private auth: AuthService, // Autenticação
    private events: EventsService // Eventos globais
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

        // 1.4) Obtém dados do usuário logado, do armazenamento local
        // tslint:disable-next-line: align
        this.cookie.cookieGet('userData')
        .then((data: string) => {
          this.userData = JSON.parse(data);
        })
        .catch((error) => {
          this.userData = undefined;
        });
  
      // 1.5) Altera dados do usuário sem recarga do script (assíncrono)
      this.events.subscribe('userData', (data: any) => {
        this.userData = data;
      });
  }

  ngOnInit() {}
}

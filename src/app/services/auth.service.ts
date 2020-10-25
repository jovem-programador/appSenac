import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


import { User } from '../interface/user';

import { auth } from 'firebase/app'; // Firebase CLI
import { CookieService } from './cookie.service'; // Service de armazenamento local
import { Router } from '@angular/router'; // Roteamento
import { AlertController, } from '@ionic/angular'; // Caixa de alerta do Ionic
import { EventsService } from './events.service'; // Service de enventos globais

import { AngularFirestore } from '@angular/fire/firestore'; // Firestore

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userDb: any;

  public authProvider: any;

  constructor(

  public fireAuth: AngularFireAuth, // Autenticação do Firebase
  public cookie: CookieService, // Armazenamento local
  public router: Router, // Roteamento
  public alertController: AlertController, // Caixas de alerta do Ionic
  public events: EventsService, // Service de enventos globais

  public db: AngularFirestore) { }

  login(provider: string) {

   // 1.4) Seleção do provedor de login social - Adicione outros provedores conoforme a configuração do Firebase Authentication
   switch (provider) {

    case 'google':
      this.authProvider = new auth.GoogleAuthProvider();
      break;

    case 'facebook':
      alert('Você precisa implementar isso no Firebase Authentication!');
      return false;
      // this.authProvider = new auth.FacebookAuthProvider();
      break;

    case 'twitter':
      alert('Você precisa implementar isso no Firebase Authentication!');
      return false;
      // this.authProvider = new auth.TwitterAuthProvider();
      break;

    case 'github':
      alert('Você precisa implementar isso no Firebase Authentication!');
      return false;
      // this.authProvider = new auth.GithubAuthProvider();
      break;

    // case ....

  }

  // tslint:disable-next-line: align
  this.fireAuth.signInWithPopup(this.authProvider).then((result) => {
    var userData = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL
    }

    this.cookie.cookieSet('userData', JSON.stringify(userData)).then(() => {

      this.events.publish('userData', userData);
      this.getUserDataBase(userData.uid);

    })

    .catch((error) => {

      // 1.13) Exibe log de erro
      console.error(error);

      // 1.14) Exibe mensagem de erro em popup
      this.viewAlert(error);
    });

  })

        // 1.15) Se login falhou
        .catch((error) => {

          // 1.16) Exibe log de erro
          console.error(error);
  
          // 1.17) Exibe mensagem de erro em popup
          this.viewAlert(error);
        });

  }

    // 1.18) Logout
    logout() {

      // 1.19) Força logout do usuário no Firebase Authentication
      this.fireAuth.signOut();
  
      // 1.20) Apaga dados do usuário do device
      this.cookie.cookieDelete('userData');
      this.cookie.cookieDelete('userCad');
  
      // 1.21) Atualiza 'userData' no menu principal (app.component.ts)
      this.events.publish('userData', undefined);
  
      // 1.22) Redireciona para 'login'
      this.router.navigate(['login']);
    }
  
    // 1.23) Popup para exibir mensagem de erro (Ionic UI Components)
    async viewAlert(error: string) {
      const alert = await this.alertController.create({
        header: 'Oooops!',
        subHeader: 'Erro de login',
        message: `Algo errado não deu certo:<br><br><small>${error}</small>`,
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['login']);
          }
        }]
      });
      await alert.present();
    }

      // 2.2) Verifica se já tem perfil completo, conforme o uid
  getUserDataBase(userId: string) {

    // Consulta o banco de dados em busca do documento
    this.db.firestore.collection('users').doc(userId).get()

      // Se a consulta foi bem sucedida
      .then(docSnapshot => {

        // Testa se documento existe
        if (docSnapshot.exists) {

          // Obtém dados do documento (perfil)
          this.userDb = docSnapshot.data();

          // Adiciona o uid aos dados
          this.userDb.uid = docSnapshot.id;

          // Salva no armazenamento local
          this.cookie.cookieSet('userProfile', JSON.stringify(this.userDb))
            .then(() => {

              // Vai para a home
              this.router.navigate(['/home']);
            });

          // Se documento não existe
        } else {

          // Vai para página de cadastro de novo perfil
          this.router.navigate(['/home']);
        }
      })

      // Em caso de falha ao acessar banco de dados, log do erro
      .catch((error) => {
        console.error(error);
      });
  }

  isLogged() {

    var userData = this.cookie.cookieGet('userData');
    console.log(userData);

  }

  getAuth(){
      return this.fireAuth;
  }


//   login(user:User){
//     return this.afa.signInWithEmailAndPassword(user.email, user.senha);
//   }

//   register(user:User){
//     return this.afa.createUserWithEmailAndPassword(user.email, user.senha);
//   }

//   logout(){

//   }
}

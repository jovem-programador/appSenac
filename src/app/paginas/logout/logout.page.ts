import { Component, OnInit } from '@angular/core';

// 1.1) Importa dependências
import { AuthService } from '../../services/auth.service'; // Serviço de autenticação
import { CookieService } from '../../services/cookie.service'; // Serviço de armazenamento local
import { Router } from '@angular/router'; // Roteamento

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  // 1.2) Variável que armazena dados do usuário, se logado
  userData: any;

  constructor(

    // 1.3) Inicializa dependências
    public authService: AuthService, // Serviço de autenticação
    public cookie: CookieService, // Armazenamento local
    public router: Router // Roteamento
  ) { }

  ngOnInit() {

    // 1.4) Lê dados do usuário armazenados no device
    this.cookie.cookieGet('userData')

    // 1.5) Se dados existem
      .then((data: string) => {

        // 1.6) Obtém dados para a view
        this.userData = JSON.parse(data);
      })

      // 1.7) Se dados não existem
      .catch((error) => {

        // 1.8) Precisa fazer login
        this.router.navigate(['/user/login']);
      });
  }

  // 1.9) Ação do botão [Sair]
  logout() {

    // 1.10) Desloga usuário
    this.authService.logout();
  }
}

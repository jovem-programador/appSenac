import { Component, OnInit } from '@angular/core';

import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pos-login',
  templateUrl: './pos-login.page.html',
  styleUrls: ['./pos-login.page.scss'],
})
export class PosLoginPage implements OnInit {

  userData: any;

  constructor(
    public cookie: CookieService,
    public router: Router,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    console.log('33', this.auth.isLogged());
    this.cookie.cookieGet('userData').then((data: string) => {
        this.userData = JSON.parse(data);
      })
      .catch((error) => {
        this.router.navigate(['/login']);
      });
  }
}

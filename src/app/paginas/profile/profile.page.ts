import { Component, OnInit } from '@angular/core';

import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: any;
  
  constructor(public cookie: CookieService) { }

  ngOnInit() {
    this.cookie.cookieGet('userData').then((data: string) => {
      this.userData = JSON.parse(data);
    })
  }

}

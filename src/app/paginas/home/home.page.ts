import { User } from './../../interface/user';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private users = new Array<User>();
  private userSubscription: Subscription;

  constructor(
    private userService: UserService,

    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.userSubscription = this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  ngOnInit() {
  }

  logoutGoogle() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
  deleteUser(){

  };


}

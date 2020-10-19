import { User } from 'src/app/interface/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private user: User = {};
  private userId: string = null;
  private userSubscription: Subscription;
  private loading: any;

  public fGroup: FormGroup;

  constructor(
    private fBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private navCtrl: NavController,
  ) {

    this.fGroup = this.fBuilder.group({
      'nome': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'sobrenome': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      // 'cpf': [null, Validators.compose([Validators.required, Validators.pattern(/^\d{3}.\d{3}.\d{3}-\d{2}$/)])],
      'perfil': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'codigo': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      // 'senha': [null, Validators.compose([Validators.required])],
    });


    this.userId = this.activeRoute.snapshot.params['id'];
    if (this.userId) this.loadUser();
  }

  ngOnInit() { }

  loadUser() {
    this.userSubscription = this.userService.getUser(this.userId).subscribe(data => {
      this.user = data;
    });
  }

  async cadastrarUsuario() {
    await this.presentLoading();

    this.user.userId = (await this.authService.getAuth().currentUser).uid;
    if (this.userId) {

    } else {
      this.user.criadoEm = new Date().getTime();
      try {
        await this.userService.addUser(this.user);
        await this.loading.dismiss();
        this.navCtrl.navigateBack('home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar.');
        this.loading.dismiss();
      }
    }

  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Cadastrando...',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000
    });
    toast.present();
  }
}

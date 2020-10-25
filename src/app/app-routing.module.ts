import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// 1.2) Força a rota para a página de login
const redirectToLogin = () => redirectUnauthorizedTo(['login']);

// 1.3) Força a rota para a página inicial
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginPageModule),

    // 1.8) Protege 'login', redirecionando para 'home' se já está logado
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToHome }
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./paginas/cadastro/cadastro.module').then( m => m.CadastroPageModule),

    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'cadastro/:id',
    loadChildren: () => import('./paginas/cadastro/cadastro.module').then( m => m.CadastroPageModule),
  //canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule),

    // 1.6) Protege 'home', redirecionando para 'login' se não logado
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'logout',
    loadChildren: () => import('./paginas/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./paginas/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'poslogin',
    loadChildren: () => import('./paginas/pos-login/pos-login.module').then( m => m.PosLoginPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./paginas/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./paginas/e404/e404.module').then( m => m.E404PageModule)
  },




  // {
  //   path: 'cadastrar',
  //   loadChildren: () => import('./paginas/cadastrar/cadastrar.module').then(m => m.CadastrarPageModule)
  // },
  // {
  //   path: 'recuperar-senha',
  //   loadChildren: () => import('./paginas/recuperar-senha/recuperar-senha.module').then(m => m.RecuperarSenhaPageModule),
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

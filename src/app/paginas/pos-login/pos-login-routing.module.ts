import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosLoginPage } from './pos-login.page';

const routes: Routes = [
  {
    path: '',
    component: PosLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosLoginPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosLoginPageRoutingModule } from './pos-login-routing.module';

import { PosLoginPage } from './pos-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosLoginPageRoutingModule
  ],
  declarations: [PosLoginPage]
})
export class PosLoginPageModule {}

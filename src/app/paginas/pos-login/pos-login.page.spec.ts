import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PosLoginPage } from './pos-login.page';

describe('PosLoginPage', () => {
  let component: PosLoginPage;
  let fixture: ComponentFixture<PosLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PosLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

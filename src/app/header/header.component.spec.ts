import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { HeaderComponent } from './header.component';
import { LoginButtonComponent } from './../core/login-button/login-button.component';
import { routerForTesting } from './../app.router';
import { StateService } from '../state.service';
import { stateServiceStub } from '../../non-angular/testHelpers';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const stateServiceStubbed = stateServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LoginButtonComponent ],
      imports: [ NgbModule.forRoot() ],
      providers: [
        NgbModal,
        { provide: StateService, useValue: stateServiceStubbed },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking the home button goes to the home page', () => {
    fixture.nativeElement.querySelector('.home').click();
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('clicking the about button goes to the about page', () => {
    fixture.nativeElement.querySelector('.about').click();
    expect(component.router.navigate).toHaveBeenCalledWith(['/about']);
  });

  it('clicking the twiglet button goes to the twiglet page', () => {
    fixture.nativeElement.querySelector('.twiglet').click();
    expect(component.router.navigate).toHaveBeenCalledWith(['/twiglet']);
  });

  it('clicking the model button goes to the model page', () => {
    fixture.nativeElement.querySelector('.model').click();
    expect(component.router.navigate).toHaveBeenCalledWith(['/model']);
  });
});

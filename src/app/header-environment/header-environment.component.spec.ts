import { FormsModule } from '@angular/forms';
import { SliderWithLabelComponent } from './../slider-with-label/slider-with-label.component';
import { Map } from 'immutable';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StateService } from '../state.service';
import { stateServiceStub } from '../../non-angular/testHelpers';
import { FontAwesomeToggleButtonComponent } from '../font-awesome-toggle-button/font-awesome-toggle-button.component';
import { HeaderEnvironmentComponent } from './header-environment.component';

describe('HeaderEnvironmentComponent', () => {
  let component: HeaderEnvironmentComponent;
  let fixture: ComponentFixture<HeaderEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontAwesomeToggleButtonComponent, HeaderEnvironmentComponent, SliderWithLabelComponent ],
      imports: [ FormsModule ],
      providers: [ { provide: StateService, useValue: stateServiceStub()} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEnvironmentComponent);
    component = fixture.componentInstance;
    component.userState = Map({ });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

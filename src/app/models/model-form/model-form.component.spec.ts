import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbAlert, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { fromJS } from 'immutable';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FontAwesomeIconPickerComponent } from './../../shared/font-awesome-icon-picker/font-awesome-icon-picker.component';
import { FormControlsSortPipe } from './../../shared/pipes/form-controls-sort.pipe';
import { fullModelMap } from '../../../non-angular/testHelpers';
import { HeaderModelComponent } from './../header-model/header-model.component';
import { ModelDropdownComponent } from './../model-dropdown/model-dropdown.component';
import { ModelFormComponent } from './model-form.component';
import { StateService } from './../../state.service';
import { stateServiceStub } from '../../../non-angular/testHelpers';

const fakeRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('ModelFormComponent', () => {
  let component: ModelFormComponent;
  let fixture: ComponentFixture<ModelFormComponent>;
  let stateServiceStubbed: StateService;

  beforeEach(async(() => {
    stateServiceStubbed = stateServiceStub();
    TestBed.configureTestingModule({
      declarations: [
        FontAwesomeIconPickerComponent ,
        FormControlsSortPipe,
        ModelFormComponent,
        ModelDropdownComponent,
        HeaderModelComponent,
      ],
      imports: [
        DragulaModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),
      ],
      providers: [
        { provide: StateService, useValue: stateServiceStubbed },
        { provide: Router, useValue: fakeRouter },
        DragulaService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelFormComponent);
    component = fixture.componentInstance;
    component.userState = fromJS({});
    component.models = fromJS([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buildForm', () => {
    it('creates a form with an entities group', () => {
      stateServiceStubbed.model.loadModel('miniModel');
      component.form = null;
      component.buildForm();
      expect((component.form.controls['entities'] as FormArray).length).toEqual(6);
    });
  });

  describe('createEntity', () => {
    it('creates an empty entity if nothing is passed in', () => {
      const control = component.createEntity();
      expect(control.value).toEqual({
        attributes: [],
        class: '',
        color: '#000000',
        image: '',
        size: '',
        type: ''
      });
    });

    it('uses the values passed in to create a non-empty entity', () => {
      const entity = {
        attributes: [],
        class: 'music',
        color: '#00FF00',
        image: '\uf001',
        size: '10',
        type: 'something'
      };
      const control = component.createEntity(fromJS(entity));
      expect(control.value).toEqual(entity);
    });
  });

  describe('remove entity', () => {
    beforeEach(() => {
      stateServiceStubbed.model.loadModel('miniModel');
      component.buildForm();
    });

    it('can remove an entity at an index', () => {
      component.removeEntity(1, component.form.controls['entities']['controls'][1]['controls']['type']);
      expect((component.form.controls['entities']['controls'].every(group => group.controls.type !== 'ent2'))).toBeTruthy();
    });
  });

  describe('add entity', () => {
    beforeEach(() => {
      stateServiceStubbed.model.loadModel('miniModel');
      component.buildForm();
    });

    it('can add an entity', () => {
      component.addEntity();
      expect((component.form.controls['entities'] as FormArray).length).toEqual(7);
    });
  });

  describe('error messages', () => {
    beforeEach(() => {
      stateServiceStubbed.model.loadModel('miniModel');
      component.buildForm();
    });

    it('does not start out showing any form errors', () => {
      expect(fixture.nativeElement.querySelector('.alert-danger')).toBeFalsy();
    });

    it('shows an error if an entity has no type', () => {
      component.form.controls['entities']['controls'][0].controls.type.patchValue('');
      component.form.controls['entities']['controls'][0].controls.type.markAsDirty();
      component.onValueChanged();
      component['cd'].markForCheck();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    });
  });

  describe('attributes', () => {
    beforeEach(() => {
      stateServiceStubbed.model.loadModel('miniModel');
      component.buildForm();
      component.expanded[0] = true;
      component.addAttribute(0);
    });

    it('add attribute button builds an attribute form', () => {
      expect((component.form.controls['entities']['controls'][0].controls.attributes as FormArray).length).toEqual(3);
    });

    it('shows an error if the attribute name is blank', () => {
      component.form.controls['entities']['controls'][0].controls.attributes.controls[0].controls['name'].setValue('');
      component.form.controls['entities']['controls'][0].controls.attributes.controls[0].controls['name'].markAsDirty();
      component.onValueChanged();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    });

    it('does not show an error if an attribute name and data type are filled out', () => {
      component.form.controls['entities']['controls'][0].controls.attributes.controls[0].controls['name'].setValue('attr1');
      component.form.controls['entities']['controls'][0].controls.attributes.controls[0].controls['name'].markAsDirty();
      component.form.controls['entities']['controls'][0].controls.attributes.controls[0].controls['dataType'].setValue('string');
      component.form.controls['entities']['controls'][0].controls.attributes.controls[0].controls['dataType'].markAsDirty();
      component.onValueChanged();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.alert-danger')).toBeFalsy();
    });

    it('remove attribute removes the attribute', () => {
      component.removeAttribute(0, 0);
      expect((component.form.controls['entities']['controls'][0].controls.attributes as FormArray).length).toEqual(2);
    });
  });
});

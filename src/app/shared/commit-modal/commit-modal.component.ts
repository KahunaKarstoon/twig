import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';

import { handleError } from '../../../non-angular/services-helpers';
import { D3Node, Link, UserState } from '../../../non-angular/interfaces';
import { StateService } from '../../state.service';
import { Validators } from '../../../non-angular/utils/formValidators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-commit-modal',
  styleUrls: ['./commit-modal.component.scss'],
  templateUrl: './commit-modal.component.html',
})
export class CommitModalComponent implements OnInit {
  userState: UserState;
  form: FormGroup;
  errorMessage;
  activeModel = false;
  activeTwiglet = false;
  router;

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder,
    private stateService: StateService, private cd: ChangeDetectorRef, router: Router, private toastr: ToastsManager) {
    this.router = router;
    if (this.router.url) {
      if (this.router.url.startsWith('/twiglet')) {
        this.activeTwiglet = true;
        this.activeModel = false;
      } else if (this.router.url.startsWith('/model')) {
        this.activeModel = true;
        this.activeTwiglet = false;
      }
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      commit: ['', Validators.required]
    });
  }

  /**
   * Gets fired on save changes, checks for twiglet model first and if not it saves the model..
   *
   *
   * @memberOf CommitModalComponent
   */
  saveChanges() {
    if (this.activeTwiglet) {
      this.stateService.twiglet.saveChanges(this.form.value.commit).subscribe(response => {
        this.stateService.userState.setEditing(false);
        this.stateService.twiglet.updateListOfTwiglets();
        this.activeModal.close();
      },
      error => {
        this.errorMessage = 'Something went wrong saving your changes.';
        console.error(error);
      });
    } else {
      this.stateService.model.saveChanges(this.form.value.commit).subscribe(result => {
        this.stateService.userState.setEditing(false);
        this.activeModal.close();
      }, handleError.bind(this));
    }
  }
}

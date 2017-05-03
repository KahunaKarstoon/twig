import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditEventsAndSeqModalComponent } from './../edit-events-and-seq-modal/edit-events-and-seq-modal.component';
import { StateService } from './../../state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-events',
  styleUrls: ['./header-events.component.scss'],
  templateUrl: './header-events.component.html',
})
export class HeaderEventsComponent implements OnInit {
  @Input() sequences; cr;
  @Input() userState;

  constructor(public modalService: NgbModal, private stateService: StateService) { }

  ngOnInit() {
  }

  createEvent() {
    const modelRef = this.modalService.open(EditEventsAndSeqModalComponent);
    const component = <EditEventsAndSeqModalComponent>modelRef.componentInstance;
  }

  play() {
    this.stateService.twiglet.playSequence();
  }

  stop() {
    this.stateService.twiglet.stopPlayback();
  }

  setPlaybackInterval($event: number) {
    this.stateService.userState.setPlaybackInterval($event * 1000);
  }

}

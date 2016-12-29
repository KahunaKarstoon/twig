import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StateService } from '../state.service';
import { ModelEntity } from '../../non-angular/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-node-by-dragging-button',
  styleUrls: ['./add-node-by-dragging-button.component.css'],
  templateUrl: './add-node-by-dragging-button.component.html',
})
export class AddNodeByDraggingButtonComponent {
  @Input() entity: { key: string, value: ModelEntity };
  disabled: boolean;

  constructor(private stateService: StateService, private cd: ChangeDetectorRef) {
    stateService.userState.observable.subscribe(response => {
      this.disabled = !response.get('isEditing');
      this.cd.markForCheck();
    });

  }

  action(nodeType: string) {
    this.stateService.userState.setNodeTypeToBeAdded(nodeType);
  }

}

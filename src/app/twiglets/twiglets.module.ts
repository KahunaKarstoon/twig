import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Autosize } from 'angular2-autosize/angular2-autosize';
import { D3Service } from 'd3-ng2-service';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import 'hammerjs';

import { AboutTwigletModalComponent } from './about-twiglet-modal/about-twiglet-modal.component';
import { AddGravityPointToggleComponent } from './add-gravity-point-toggle/add-gravity-point-toggle.component';
import { AddNodeByDraggingButtonComponent } from './add-node-by-dragging-button/add-node-by-dragging-button.component';
import { CopyPasteNodeComponent } from './copy-paste-node/copy-paste-node.component';
import { CreateEventsModalComponent } from './create-events-modal/create-events-modal.component';
import { CreateTwigletModalComponent } from './create-twiglet-modal/create-twiglet-modal.component';
import { EditGravityPointModalComponent } from './edit-gravity-point-modal/edit-gravity-point-modal.component';
import { EditLinkModalComponent } from './edit-link-modal/edit-link-modal.component';
import { EditNodeModalComponent } from './edit-node-modal/edit-node-modal.component';
import { EditTwigletDetailsComponent } from './edit-twiglet-details/edit-twiglet-details.component';
import { HeaderEnvironmentComponent } from './header-environment/header-environment.component';
import { HeaderEventsComponent } from './header-events/header-events.component';
import { HeaderSimulationControlsComponent } from './header-simulation-controls/header-simulation-controls.component';
import { HeaderTwigletComponent } from './header-twiglet/header-twiglet.component';
import { HeaderTwigletEditComponent } from './header-twiglet-edit/header-twiglet-edit.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { NodeInfoComponent } from './node-info/node-info.component';
import { router } from './../app.router';
import { SharedModule } from './../shared/shared.module';
import { TwigletDropdownComponent } from './twiglet-dropdown/twiglet-dropdown.component';
import { TwigletFiltersComponent } from './twiglet-filters/twiglet-filters.component';
import { TwigletFilterTargetComponent } from './twiglet-filter-target/twiglet-filter-target.component';
import { TwigletGraphComponent } from './twiglet-graph/twiglet-graph.component';
import { TwigletModelViewComponent } from './twiglet-model-view/twiglet-model-view.component';
import { TwigletNodeGroupComponent } from './twiglet-node-group/twiglet-node-group.component';
import { TwigletNodeListComponent } from './twiglet-node-list/twiglet-node-list.component';
import { ViewDropdownComponent } from './view-dropdown/view-dropdown.component';
import { ViewsSaveModalComponent } from './views-save-modal/views-save-modal.component';

@NgModule({
    declarations: [
        AboutTwigletModalComponent,
        AddGravityPointToggleComponent,
        AddNodeByDraggingButtonComponent,
        Autosize,
        CopyPasteNodeComponent,
        CreateEventsModalComponent,
        CreateTwigletModalComponent,
        EditGravityPointModalComponent,
        EditLinkModalComponent,
        EditNodeModalComponent,
        EditTwigletDetailsComponent,
        HeaderEnvironmentComponent,
        HeaderEventsComponent,
        HeaderSimulationControlsComponent,
        HeaderTwigletComponent,
        HeaderTwigletEditComponent,
        HeaderViewComponent,
        NodeInfoComponent,
        TwigletDropdownComponent,
        TwigletFiltersComponent,
        TwigletFilterTargetComponent,
        TwigletGraphComponent,
        TwigletModelViewComponent,
        TwigletNodeGroupComponent,
        TwigletNodeListComponent,
        ViewDropdownComponent,
        ViewsSaveModalComponent,
    ],
    entryComponents: [
        AboutTwigletModalComponent,
        CreateEventsModalComponent,
        CreateTwigletModalComponent,
        EditGravityPointModalComponent,
        EditLinkModalComponent,
        EditNodeModalComponent,
        EditTwigletDetailsComponent,
        ViewsSaveModalComponent,
    ],
    exports: [
        AddNodeByDraggingButtonComponent,
        EditTwigletDetailsComponent,
        HeaderEnvironmentComponent,
        HeaderEventsComponent,
        HeaderSimulationControlsComponent,
        HeaderTwigletComponent,
        HeaderTwigletEditComponent,
        HeaderViewComponent,
        TwigletDropdownComponent,
        TwigletFiltersComponent,
        TwigletGraphComponent,
        TwigletModelViewComponent,
        TwigletNodeListComponent,
        ViewDropdownComponent,
    ],
    imports: [
        CommonModule,
        Ng2PageScrollModule.forRoot(),
        NgbModule.forRoot(),
        router,
        SharedModule,
        ToastModule.forRoot(),
    ],
})
export class TwigletsModule { }

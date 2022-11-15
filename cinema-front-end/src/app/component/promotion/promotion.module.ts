import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import {FormsModule} from '@angular/forms';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PromotionListComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbDatepickerModule
  ]
})
export class PromotionModule { }

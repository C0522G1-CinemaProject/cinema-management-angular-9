import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import {FormsModule} from '@angular/forms';
import {NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { PromotionListFrontComponent } from './promotion-list-front/promotion-list-front.component';


@NgModule({
  declarations: [
    PromotionCreateComponent,
    PromotionEditComponent,
    PromotionListComponent,
    PromotionDetailComponent,
    PromotionListFrontComponent
 ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class PromotionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PromotionListComponent } from './promotion-list/promotion-list.component';


@NgModule({
  declarations: [
    PromotionCreateComponent,
    PromotionEditComponent,
    PromotionListComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PromotionModule { }

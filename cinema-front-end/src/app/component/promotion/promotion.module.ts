import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionListComponent } from './promotion-list/promotion-list.component';


@NgModule({
  declarations: [
    PromotionListComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule
  ]
})
export class PromotionModule { }

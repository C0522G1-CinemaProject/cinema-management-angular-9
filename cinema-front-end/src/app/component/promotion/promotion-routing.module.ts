import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PromotionListComponent} from './promotion-list/promotion-list.component';
import {PromotionListFrontComponent} from './promotion-list-front/promotion-list-front.component';
import {PromotionDetailComponent} from './promotion-detail/promotion-detail.component';

const routes: Routes = [
  {
    path: '', component: PromotionListComponent
  },
  {
    path: 'list', component: PromotionListFrontComponent
  },
  {
    path: 'detail/:id', component: PromotionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule {
}

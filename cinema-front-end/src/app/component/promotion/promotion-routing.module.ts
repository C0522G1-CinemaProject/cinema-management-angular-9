import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PromotionCreateComponent} from './promotion-create/promotion-create.component';
import {PromotionEditComponent} from './promotion-edit/promotion-edit.component';
import {PromotionListComponent} from './promotion-list/promotion-list.component';
import {PromotionListFrontComponent} from './promotion-list-front/promotion-list-front.component';
import {PromotionDetailComponent} from './promotion-detail/promotion-detail.component';

const routes: Routes = [
  {
    path: 'list', component: PromotionListComponent
  },
  {
    path: '', component: PromotionListFrontComponent
  },
  {
    path: 'detail/:id', component: PromotionDetailComponent
  },
  {
    path: 'create', component: PromotionCreateComponent
  },
  {
    path: 'edit/:id', component: PromotionEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule {
}

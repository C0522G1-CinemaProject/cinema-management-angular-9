import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomComponent} from './room/room.component';
import {DetailRoomComponent} from './detail-room/detail-room.component';

const routes: Routes = [
  {path: 'list', component: RoomComponent},
  {path: 'list/:id', component: DetailRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule {
}

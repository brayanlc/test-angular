import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuminaryComponent } from './pages/luminary/luminary.component';

const routes: Routes = [{ path: '', component: LuminaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LuminaryComponent } from './pages/luminary/luminary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ToolBarComponent, MapComponent, LuminaryComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class MapModule {}

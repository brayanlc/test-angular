import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Properties } from '../../state/geolocation';
import { ToolBarComponent } from '../../components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-luminary',
  template: `
    <app-map (properties)="setProperties($event)"></app-map>
    <app-tool-bar></app-tool-bar>
  `,
  styles: [],
})
export class LuminaryComponent implements OnInit {
  @ViewChild(ToolBarComponent) toolBarComponent: ToolBarComponent | undefined;
  properties!: Properties;

  constructor() {}

  ngOnInit(): void {}

  setProperties(properties: Properties) {
    this.properties = properties;
    console.log(this.properties);
    this.toolBarComponent?.setForm(properties);
  }
}

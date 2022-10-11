import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  circleMarker,
  geoJSON,
  GeoJSONOptions,
  latLng,
  LatLng,
  LeafletMouseEvent,
  Map,
  MapOptions,
  tileLayer,
} from 'leaflet';
import * as geojson from 'geojson';
import { GeolocationService } from '../../state/geolocation.service';
import { FeatureCollection, Properties } from '../../state/geolocation';

@Component({
  selector: 'app-map',
  template: `
    <div
      class="map-container"
      [leafletOptions]="options"
      (leafletMapReady)="onMapReady($event)"
      leaflet
    ></div>
  `,
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  public map!: Map;
  luminaires!: FeatureCollection;
  geoJSON: any;
  @Output() properties: EventEmitter<Properties> =
    new EventEmitter<Properties>();

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 30,
      }),
    ],
    zoom: 15,
    center: latLng(37.58811876638322, -4.084510803222657),
  };

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.geolocationService.getLuminaires().subscribe(res => {
      this.luminaires = res;
      this.addLuminairesLayer();
    });
  }

  public mapOptions: MapOptions = {
    zoom: 17,
    zoomControl: false,
    center: [40.395347, -3.694041],
    preferCanvas: true,
  };

  public onMapReady(map: Map): void {
    this.map = map;
  }

  private async addLuminairesLayer(): Promise<void> {
    const options: GeoJSONOptions = {
      pointToLayer: (feature: GeoJSON.Feature, latLng: LatLng) =>
        circleMarker(latLng),
      style: function (
        feature: geojson.Feature<geojson.Geometry, any> | undefined,
      ) {
        return {
          radius: 8,
          color: '#333',
          fillColor: '#FFFA4D',
          weight: 1,
          opacity: 1,
          fillOpacity: 1,
        };
      },
    };
    this.geoJSON = geoJSON(this.luminaires, options)
      .addTo(this.map)
      .on('click', e => {
        this.onClick(e);
      });
  }

  onClick(e: LeafletMouseEvent) {
    this.map.setView(latLng(e.latlng.lat, e.latlng.lng), 17);
    this.geoJSON.resetStyle();
    e.layer.setStyle({
      radius: 10,
      color: '#333',
      fillColor: '#4da6ff',
      weight: 1,
      opacity: 1,
      fillOpacity: 1,
    });
    this.properties.emit(e.layer.feature.properties);
  }
}

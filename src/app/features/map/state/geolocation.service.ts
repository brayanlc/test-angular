import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Feature, FeatureCollection, Properties } from './geolocation';
import * as Highcharts from 'highcharts';

type tplotOptions = {
  [key: string]: { name: string; y?: number; count?: number };
};
@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getLuminaires(): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>('assets/data/luminarias.geojson');
  }

  getDataPie(propertyName: string): Observable<any> {
    return this.getLuminaires().pipe(
      map(res => {
        const data = res?.features?.reduce((group: tplotOptions, product) => {
          const property = product.properties[propertyName as keyof Properties];
          group[property] = {
            name: property || 'Ninguno',
            y: this.percentage(
              group[property]?.count || 0,
              res?.features.length,
            ),
            count: (group[property]?.count || 0) + 1,
          };
          return group;
        }, {});
        return Object.entries(data).map(entry => {
          entry[1].count = undefined;
          return entry[1];
        });
      }),
    );
  }

  percentage(partialValue: number, totalValue: number) {
    return (100 * partialValue) / totalValue;
  }
}

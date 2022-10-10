import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureCollection } from './geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getLuminaires(): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>('assets/data/luminarias.geojson');
  }
}

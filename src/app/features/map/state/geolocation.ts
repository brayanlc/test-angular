import * as geojson from 'geojson';

export interface Properties {
  observaciones: string;
  id_luminaria: string;
  punto_luz: string;
  vial: string;
  numero: number;
  lado_via?: any;
  distancia_eje?: any;
  s1?: any;
  s2?: any;
  centro_mando: string;
  circuito: string;
  operativa: string;
  altura: number;
  tipo_soporte: string;
  marca_soporte: string;
  modelo_soporte: string;
  estado_soporte: string;
  situacion_soporte?: any;
  tamano_brazo?: any;
  longitud_brazo?: any;
  orientacion_brazo?: any;
  tipo_luminaria: string;
  marca_luminaria: string;
  modelo_luminaria: string;
  estado_luminaria: string;
  tipo_lampara: string;
  marca_lampara: string;
  modelo_lampara: string;
  estado_lampara: string;
  cantidad_lamparas: number;
  potencia: number;
  equipo_auxiliar: string;
  situacion_equipo_auxiliar: string;
  orientacion?: any;
  alta: boolean;
  usuario_alta: string;
  fecha_alta: string;
  modificado: boolean;
  usuario_modificado: string;
  fecha_modificado: string;
  herramienta: string;
  numero_registro: number;
  envio?: any;
  fecha_envio?: any;
  id_centro_mando?: any;
  id_circuito?: any;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
  id: number;
}

export interface PropertyCrs {
  name: string;
}

export interface Crs {
  type: string;
  properties: PropertyCrs[];
}

export interface FeatureCollection extends geojson.GeoJsonObject {
  crs: Crs;
  feature: Feature[];
  type:
    | 'Point'
    | 'MultiPoint'
    | 'LineString'
    | 'MultiLineString'
    | 'Polygon'
    | 'MultiPolygon'
    | 'GeometryCollection'
    | 'Feature'
    | 'FeatureCollection';
  name: string;
}

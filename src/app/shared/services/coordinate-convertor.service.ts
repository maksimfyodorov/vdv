import { Injectable } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import { transform } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { HDMSLonLat, HDMSLonLatString } from '../types/hdmscoordinates';

@Injectable({
  providedIn: 'root',
})
export class CoordinateConvertorService {

  private mercatorProjection = new Projection({ code: 'EPSG:3857' });
  private lonLatProjection = new Projection({ code: 'EPSG:4326' });

  constructor() { }

  public mapMercatorToHDMS(coordinates: number[]): HDMSLonLat {
    const coordinatesStringHDMS = this.mapMercatorToStringHDMS(coordinates);
    const longitude = coordinatesStringHDMS.longitude.split(' ');
    const latitude = coordinatesStringHDMS.latitude.split(' ');

    return {
      longitude: {
        degree: parseInt(longitude[0], 10),
        minute: parseInt(longitude[1], 10),
        second: parseInt(longitude[2], 10),
        type: longitude[3],
      },
      latitude: {
        degree: parseInt(latitude[0], 10),
        minute: parseInt(latitude[1], 10),
        second: parseInt(latitude[2], 10),
        type: latitude[3],
      },
    };
  }

  public mapStringHDMSToMercator(coordinate: HDMSLonLat): number[] {
    const coordinates = this.mapStringHDMSToLonLat(coordinate);
    return this.mapLonLatToMercator(coordinates);
  }

  public mapMercatorToStringHDMS(coordinates: number[]): HDMSLonLatString {
    coordinates = this.mapMercatorToLonLat(coordinates);
    return this.mapLonLatToStringHDMS(coordinates);
  }

  public mapLonLatToMercator(coordinates: number[]): number[] {
    return transform(coordinates, this.lonLatProjection, this.mercatorProjection);
  }

  public mapMercatorToLonLat(coordinates: number[]): number[] {
    return transform(coordinates, this.mercatorProjection, this.lonLatProjection);
  }

  public mapLonLatToStringHDMS(coordinates: number[]): HDMSLonLatString {
    const stringHDMS = toStringHDMS(coordinates).split(' ');

    return {
      latitude: stringHDMS.slice(0, 4).join(' '),
      longitude: stringHDMS.slice(4).join(' '),
    };
  }

  public mapStringHDMSToLonLat(coordinate: HDMSLonLat): number[] {
    const latitude = Number((coordinate.latitude.degree + coordinate.latitude.minute / 60 + coordinate.latitude.second / 3600)
      .toFixed(15));
    const longitude = Number((coordinate.longitude.degree + coordinate.longitude.minute / 60 + coordinate.longitude.second / 3600)
      .toFixed(15));

    return [longitude, latitude];
  }
}

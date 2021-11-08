import { Pipe, PipeTransform } from '@angular/core';
import { CoordinateConvertorService } from '../../../../services/coordinate-convertor.service';
import { HDMSCoordinates } from '../../../../types/hdmscoordinates';

const TYPE_COORDINATE = {
  N: 'с.ш.',
  S: 'ю.ш.',
  W: 'з.д.',
  E: 'в.д.',
};

@Pipe({
  name: 'MercatorToHDMS',
})
export class MercatorToHDMSPipe implements PipeTransform {

  constructor(
    private convertor: CoordinateConvertorService,
  ) {}

  public transform(coordinates: number[]): string {
    const HDMSCoordinate = this.setHDMSCoordinates(coordinates[1], coordinates[0]);

    return `${this.createHDMSString(HDMSCoordinate.latitude)} ${this.createHDMSString(HDMSCoordinate.longitude)}`;
  }

  private setHDMSCoordinates(latitude: number, longitude: number): any {
    return this.convertor.mapMercatorToHDMS([latitude, longitude]);
  }

  private createHDMSString(coordinate: HDMSCoordinates): string {
    const degree = coordinate?.degree ? coordinate?.degree : 0;
    const minute = coordinate?.minute ? coordinate?.minute : 0;
    const second = coordinate?.second ? coordinate?.second : 0;
    const type = coordinate?.type ? TYPE_COORDINATE[coordinate.type] : '';

    return `${degree}° ${minute}′ ${second}″ ${type || ''}`;
  }
}


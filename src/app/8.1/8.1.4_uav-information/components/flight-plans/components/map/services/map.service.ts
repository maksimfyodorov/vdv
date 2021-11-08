import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Task } from '../../../types/tasks';
import { SignLoader, TextAlignment, PenStyles, FontWeight } from 'ues';
import { SignLoaderInterface, SitObject, UesInstance } from '../../../../../../../shared/types/roo-types';
import { KEUZ_CODES } from '../../../../../../../shared/utils/constants';
import {
  LineSitObjectDirector,
  SitObjectDirector
} from '../../../../../../../shared/components/map/ol-map-init/services/sit-object-builder';
import { RGBA } from '../../../../../../../shared/components/map/ol-map-init/types/map-view.types';
import { CoordinateOfTaskPoint } from '../types/map';
import { cloneDeep } from 'lodash'

const COORDINATES_POINT_DATA = [
  { field: 'coordinates_start', text: 'C', key: 'start' },
  { field: 'coordinates_track_points', key: 'trackPoint' },
  { field: 'coordinates_landing', text: 'П', key: 'landing' },
  { field: 'coordinates_nsu_location', text: 'НСУ', key: 'NSU' },
];
const POINT_COLOR = {

  default: { red: 34, green: 139, blue: 230, alpha: 1 },
  with_error: { red: 240, green: 140, blue: 0, alpha: 1 },
  not_passed: { red: 224, green: 49, blue: 49, alpha: 1 },
  passed: { red: 102, green: 168, blue: 15, alpha: 1 },
};

@Injectable()
export class MapService {
  public selectedTask: ReplaySubject<Task> = new ReplaySubject<Task>(1);
  public uesInstance: UesInstance;
  private iconData: unknown;
  private arrayOfCoordinates: CoordinateOfTaskPoint[] = [];

  constructor() {
  }

  public createMarks(): void {
    const signLoader: SignLoaderInterface = new SignLoader(this.uesInstance);
    signLoader.loadSignData(KEUZ_CODES.CIRCLE_WITH_TEXT, data => {
      this.iconData = data;
    });
  }

  public getObjectSitObject(): SitObject[] {
    return this.arrayOfCoordinates.map(item => this.createObject(item));
  }

  public showLines(): SitObject[] {
    const coordinates = this.arrayOfCoordinates
      .filter(item => item.key !== 'NSU')
      .map(item => [item.coordinate?.x, item.coordinate?.y]);
    const arrayOfPoints = [];
    const sitObjects = [];

    this.createArrayOfPoints(coordinates, arrayOfPoints);


    arrayOfPoints.forEach(coordinate => {
      sitObjects.push(this.createLine(coordinate));
    });
    return sitObjects;
  }

  public createCoordinates(task: Task): void {
    this.arrayOfCoordinates = [];

    COORDINATES_POINT_DATA.forEach(field => {
      if (Array.isArray(task[field.field])) {
        task[field.field].sort((a, b) => a.index - b.index).forEach((item, index) => {
          this.arrayOfCoordinates.push({ coordinate: item, text: index + 1, key: field.key });
        });
      } else {
        this.arrayOfCoordinates.push({ coordinate: task[field.field], text: field.text, key: field.key });
      }
    });
  }

  private createArrayOfPoints(coordinates: number[][], arrayOfPoints: number[][][]): void {
    coordinates.reduce(((previousValue, currentValue, index) => {
      if (!previousValue) {
        arrayOfPoints.push([currentValue, coordinates[index + 1]]);

        return currentValue;
      }

      arrayOfPoints.push([previousValue, currentValue]);

      return currentValue;
    }));
  }

  private createObject(coordinate: CoordinateOfTaskPoint): SitObject {
    return new SitObjectDirector()
      .createUnit()
      .addAsset(this.iconData)
      .addCoordinates([coordinate?.coordinate?.x, coordinate?.coordinate?.y])
      .addStyles({ color: this.getColor(coordinate?.coordinate?.status), scale: 2 })
      .addStyleToPen({ color: '#FFF', width: 2 })
      .addText(coordinate.text.toString(), 1, { color: '#FFF', align: TextAlignment.BOTTOM })
      .setFontStyle({ size: 80, weight: FontWeight.BOLD }, 1)
      .setIsMovable(false)
      .getResult();
  }

  private createLine(coordinate: number[][]): SitObject {
    return new LineSitObjectDirector()
      .createLine()
      .createLineObject()
      .createLineByPoints(coordinate[0], coordinate[1])
      .createLineStyle({color: '#000', width: 1, penStyle: PenStyles.SOLID_PEN_STYLE}, 0)
      .setIsMovable(false)
      .getResultLine();
  }

  private getColor(status: string): RGBA {
    return POINT_COLOR[status] || POINT_COLOR.default;
  }

  public checkEqualCoordinates(): void {
    const pointsCopy = cloneDeep(this.arrayOfCoordinates);

    this.arrayOfCoordinates.forEach(point => {
      const filteredPoint = pointsCopy.filter(item => point.coordinate?.x === item.coordinate?.x && point.coordinate?.y && item.coordinate?.y)
      let text = '';
      filteredPoint.forEach((pointItem, i) => {
        text += i === filteredPoint.length -1 ? pointItem.text : `${pointItem.text} + `;
      })
      point.text = text;
    })
  }
}

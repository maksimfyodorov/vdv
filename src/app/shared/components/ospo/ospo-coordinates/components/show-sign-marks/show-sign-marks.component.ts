import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SignLoaderInterface, SitObject, SituationInterface, SituationLayer, UesInstance } from '../../../../../types/roo-types';
import { ListenerInfo } from 'ues_ui/app/frame-list/types/ListenerInfo';
import { UesService } from 'ues_ui';
import { delay, switchMap, tap } from 'rxjs/operators';
import { KEUZ_CODES, SIT_OBJECT_FLAGS } from '../../../../../utils/constants';
import { Observable } from 'rxjs';
import { SignsData } from 'ues_ui/app/sign-desc-module/common/models';
import { SitLayer, Situation, drawSign, SignLoader, SitBrush, BrushPatterns } from 'ues';
import { MarkDataService } from '../../services/mark-data.service';
import { Mark } from '../../types/mark';

@Component({
  selector: 'app-show-sign-marks',
  template: '',
})
export class ShowSignMarksComponent implements OnInit, OnDestroy {

  @Output() public openDialogViewEmit: EventEmitter<string> = new EventEmitter<string>();

  private uesInstance: UesInstance;
  private sitLayer: SituationLayer;
  private uesMapChangesListener: ListenerInfo | any;

  // Значки РОО
  private textSignData: unknown;
  private circleSignData: unknown;

  constructor(
    private readonly uesService: UesService,
    private readonly markData: MarkDataService,
  ) {
  }

  public ngOnInit(): void {
    // Ждем instance карты, добавляем конфиг карты, обработку клика по карте и добавляем слой на котором будем выводить значки.
    this.uesService.onMapCreated.pipe(
      delay(2000),
      tap(_ => this.initMap()),
      switchMap(_ => this.markData.marks),
    ).subscribe(marks => this.showMarks(marks));

    // Загружаем значки
    this.loadSign(KEUZ_CODES.TEXT).subscribe(res => this.textSignData = res);
    this.loadSign(KEUZ_CODES.CIRCLE_WITH_FILL).subscribe(res => this.circleSignData = res);
  }

  public ngOnDestroy(): void {
    if (this.uesMapChangesListener) {
      this.uesInstance.removeListener(this.uesMapChangesListener);
    }
  }

  private initMap(): void {
    this.uesInstance = this.uesService.getUesInstance();
    const situation: SituationInterface = new Situation(this.uesInstance.getMap());
    this.sitLayer = new SitLayer();
    situation.addLayer(this.sitLayer);

    this.uesMapChangesListener = this.uesInstance.addListener('ues_object_selection_changed', this.objectSelectedHandler);
  }

  private showMarks(marks: Mark[]): void {
    this.sitLayer.removeObjects();

    marks?.forEach(mark => {
      const x = mark.object_geom.coordinates[0];
      const y = mark.object_geom.coordinates[1];

      const coords = [x, y];
      const coordsText = [x, y - 3500];

      // Связываем координаты и значки
      const sitObjectCircle: SitObject = this.createSitObject(this.circleSignData, coords);
      const sitObjectText: SitObject = this.createSitObject(this.textSignData, coordsText);

      // Добавляем стили для кругов
      this.setStyleSign(sitObjectCircle, { r: 0, g: 0, b: 0, opacity: 1 });

      // Отключаем передвижение значков
      this.setFlagNotMove([sitObjectCircle, sitObjectText]);

      // Меняем текст у значка
      sitObjectText.getItems()[0].setText(``);
      sitObjectText.getItems()[1].setText(`Название: ${mark.name}`);

      // id, чтобы при клике искать нужный объект
      this.setDataAttribute([sitObjectText, sitObjectCircle], { key: 'id', value: mark.uuid });

      this.addObjects([sitObjectCircle, sitObjectText]);
    });
  }

  private loadSign(classCode: string | number): Observable<SignsData> {
    const loader: SignLoaderInterface = new SignLoader(this.uesInstance);

    return new Observable(subscriber => {
      loader.loadSignData(classCode, signData => {
        subscriber.next(signData);
        subscriber.complete();
      });
    });
  }

  private objectSelectedHandler = (evt: { sitObject: SitObject }[]) => {
    if (evt.length) {
      const objectId: string = evt[0].sitObject?.getData('id');

      this.openDialogViewEmit.emit(objectId);
    }
  }

  private addObjects(sitObjects: SitObject[]): void {
    sitObjects.forEach(obj => {
      this.sitLayer.addObject(obj);
    });
  }

  private setStyleSign(obj: SitObject, color: any, scale?: number): void {
    if (scale) {
      obj.setScaleX(1.5);
      obj.setScaleY(1.5);
    }

    obj.getItems()[0].setBrush(this.createBrush(color.r, color.g, color.b, color.opacity));
  }

  private setFlagNotMove(sitObjects: SitObject[]): void {
    sitObjects.forEach(obj => obj.setFlag(SIT_OBJECT_FLAGS.OBJECT_MOVABLE, false));
  }

  private createBrush(r: string | number, g: string | number, b: string | number, opacity: number = 1.0): SitBrush {
    const brush = new SitBrush();

    brush.setPattern(BrushPatterns.SOLID_BRUSH_PATTERN);
    brush.setRGBA({ red: r, green: g, blue: b, alpha: opacity });

    return brush;
  }

  private createSitObject(signData: unknown, coordinate: number[]): SitObject {
    return drawSign(signData, [coordinate]);
  }

  private setDataAttribute(sitObjects: SitObject[], attr): void {
    sitObjects.forEach(obj => obj.setData(attr.key, attr.value));
  }
}

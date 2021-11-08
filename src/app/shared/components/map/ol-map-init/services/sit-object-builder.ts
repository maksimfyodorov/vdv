import { drawSign, SitBrush, BrushPatterns, SitObject, SitPen, PenStyles, SitFont, IndependentPoint, LineItem } from 'ues';
import { SitObjectStyles } from '../types/map-view.types';
import { SIT_OBJECT_FLAGS } from '../../../../utils/constants';
import { FontStyle, PenStyle, TextStyle } from '../../../../../8.1/8.1.4_uav-information/components/flight-plans/components/map/types/map';

export class SitObjectDirector {
  public createUnit(): SitUnitObjectBuilder {
    return new SitUnitObjectBuilder();
  }
}

export class LineSitObjectDirector {
  public createLine(): SitLineObjectBuilder {
    return new SitLineObjectBuilder();
  }
}

export class SitUnitObjectBuilder {
  protected icon: unknown;
  protected resultObject: SitObject;

  public addAsset(icon: unknown): SitUnitObjectBuilder {
    this.icon = icon;

    return this;
  }

  public addCoordinates(coordinates: number[]): SitUnitObjectBuilder {
    this.resultObject = drawSign(this.icon, [coordinates]);

    return this;
  }

  public addStyles(styles: SitObjectStyles, line: number = 0): SitUnitObjectBuilder {
    const brush = new SitBrush();
    brush.setPattern(BrushPatterns.SOLID_BRUSH_PATTERN);
    brush.setRGBA(styles.color);

    this.resultObject.setScaleX(styles.scale);
    this.resultObject.setScaleY(styles.scale);
    this.resultObject.getItems()[line].setBrush(brush);

    return this;
  }

  public setIsMovable(movable: boolean = false): SitUnitObjectBuilder {
    this.resultObject.setFlag(SIT_OBJECT_FLAGS.OBJECT_MOVABLE, movable);

    return this;
  }

  public addDataAttribute(data: { key: string, value: any }): SitUnitObjectBuilder {
    this.resultObject.setData(data.key, data.value);

    return this;
  }

  public addStyleToPen(style: PenStyle, line: number = 0): SitUnitObjectBuilder {
    const pen = new SitPen();
    pen.setStyle(PenStyles.SOLID_PEN_STYLE);
    pen.setColor(style.color);
    pen.setWidth(style.width);

    this.resultObject.getItems()[line].setPens([pen]);

    return this;
  }

  public addText(text: string, line: number, style?: TextStyle): SitUnitObjectBuilder {
    const item = this.resultObject.getItems()[line];

    item.setText(text);
    item.setColor(style?.color);
    item.setAlign(style?.align);
    item.setVisible(true);

    return this;
  }

  public setFontStyle(fontStyle: FontStyle, line: number = 0): SitUnitObjectBuilder {
    const item = this.resultObject.getItems()[line];
    const sitFont = new SitFont();
    sitFont.setPixelSize(fontStyle.size);
    sitFont.setPointSize(10);
    sitFont.setWeight(fontStyle.weight);
    item.setFont(sitFont);

    return this;
  }

  public getResult(): SitObject {
    return this.resultObject;
  }
}

export class SitLineObjectBuilder {
  protected resultLine: SitObject;

  public createLineObject(): SitLineObjectBuilder {
    this.resultLine = new SitObject();

    return this;
  }

  public createLineByPoints(coordinateStart: number[], coordinateEnd: number[]): SitLineObjectBuilder {
    const item = new LineItem(this.resultLine);
    const pointStart = new IndependentPoint(coordinateStart);
    const pointEnd = new IndependentPoint(coordinateEnd);
    this.resultLine.addPoint(pointStart);
    this.resultLine.addPoint(pointEnd);
    item.setPoints([pointStart, pointEnd]);
    item.setSpaces([[0, 1]])
    this.resultLine.addItem(item);

    return this;
  }

  public createLineStyle(style: PenStyle, line: number = 0): SitLineObjectBuilder {
    const lineItem = this.resultLine.getItems()[line]
    const pen = new SitPen();
    pen.setStyle(style.penStyle);
    pen.setColor(style.color);
    pen.setWidth(style.width);
    lineItem.setPens([pen]);

    return this;
  }

  public setIsMovable(movable: boolean = false): SitLineObjectBuilder {
    this.resultLine.setFlag(SIT_OBJECT_FLAGS.OBJECT_MOVABLE, movable);

    return this;
  }

  public getResultLine(): SitObject {
    return this.resultLine;
  }
}

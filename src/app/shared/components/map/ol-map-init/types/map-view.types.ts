export const NORMAL_STATE_STYLE: SitObjectStyles = {
  color: {red: 126, green: 102, blue: 255, alpha: 1},
  scale: 1,
};

export interface MapAsset {
  [key: string]: unknown;
}

export interface UnitViewFlags extends MapAsset {
  battalion: unknown;
  command: unknown;
  division: unknown;
  regiment: unknown;
  conjunction: unknown;
}

export interface UnitViewIcons extends MapAsset {
  textSign: unknown;
  circleSign: unknown;
}

export interface AssetRequest {
  [key: string]: string;
}

export interface SitObjectStyles {
  color: RGBA;
  scale?: number;
}

export interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

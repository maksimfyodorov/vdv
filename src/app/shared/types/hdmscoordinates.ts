export interface HDMSLonLat {
  longitude: HDMSCoordinates;
  latitude: HDMSCoordinates;
}

export interface HDMSCoordinates {
  degree: number;
  minute: number;
  second: number;
  type: string;
  str?: string;
}

export interface HDMSLonLatString {
  longitude: string;
  latitude: string;
}

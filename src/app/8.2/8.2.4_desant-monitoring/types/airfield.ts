export interface Airfield {
  coordinates: {
    y: number;
    mark: string;
    x: number;
    uuid: string;
  };
  name: string;
  uuid: string;
}


export interface Coordinate {
  mark: string;
  uuid: string;
  x: number;
  y: number;
}


export interface PostAirfield {
  name: string;
  coordinates_uuid: string;
}


export interface PutAirfield {
  uuid: string;
  name: string;
  coordinates_type: string;
}

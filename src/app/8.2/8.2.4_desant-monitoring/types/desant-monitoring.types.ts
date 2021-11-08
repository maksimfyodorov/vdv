import {MilitaryMen} from '../../../shared/components/military/interfaces';

export interface Militaries extends MilitaryMen{
  appointment: {uuid: string, name: string};
  division: { label: string, id: number, pid: number };
  middle_name: string;
  name: string;
  rank: {category: {uuid: string, alias: string, name: string}, name: string, uuid: string} ;
  surname: string;
  uuid: string;
}
export interface DesantTech {
  inventoryNumber: string;
  jumpCount: number;
  name: string;
  number: number;
  subdivision: string;

}

import {
  SecurityHierarchy, SecurityTech,
  SecurityTotal,
} from '../../../../../shared/components/ospo/ospo-security/types/security.types';

export interface UavStateHierarchy extends SecurityHierarchy {
  total: UavStateTotal;
  hierarchy: Array<{ total: SecurityTotal; children: SecurityTech[] & any } & any>;
  flight_info?: any;
}


export interface UavStateTotal extends SecurityTotal {
  flight: number;
  completed: number;
  not_completed: number;
}

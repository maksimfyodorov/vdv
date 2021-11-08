import { Periods } from '../components/document-dialog/components/document-settings/document-settings.constants';

export interface DocumentConfig {
  periods?: Periods;
  militaryUnits?: MilitaryUnits;
  signers?: Militaries;
  approvers?: Militaries;
  coordinators?: Militaries;
  militaryUnit?: number | null;
}

export interface MilitaryUnits {
  areShown?: boolean;
  required?: boolean;
}

export interface Militaries {
  areShown?: boolean;
  required?: boolean;
  haveAnyAmount?: boolean;
  amount?: number;
  amountOfRequired?: number;
  preseted?: string[];
}

const periods: Periods = {
  areShown: true,
  day: true,
  week: true,
  month: true,
  periods: true,
  academic: true,
};

const militaryUnits: MilitaryUnits = {
  areShown: true,
  required: false,
};

const signers: Militaries = {
  areShown: true,
  required: false,
  haveAnyAmount: true,
  amount: 1,
  amountOfRequired: 0,
  preseted: [],
};

const approvers: Militaries = {
  areShown: true,
  required: false,
  haveAnyAmount: true,
  amount: 1,
  amountOfRequired: 0,
  preseted: [],
};

const coordinators: Militaries = {
  areShown: true,
  required: false,
  haveAnyAmount: true,
  amount: 1,
  amountOfRequired: 0,
  preseted: [],
};

export const DOCUMENT_CONFIG: DocumentConfig = {
  periods,
  militaryUnits,
  signers,
  approvers,
  coordinators,
};

export interface MilitaryUnit {
  expanded?: boolean;
  id: number;
  label: string;
  children: MilitaryUnit[];
  access_level?: {
    id: number;
    name: string;
  };
  selectable?: boolean;
}

export const enum ACCESS_LEVELS {
  ministry,
  command,
  front,
  army,
  brigade,
  regiment,
  battalion,
  company,
  platoon,
  department,
  division,
  union,
}

export type selectionMode = 'checkbox' | 'single';

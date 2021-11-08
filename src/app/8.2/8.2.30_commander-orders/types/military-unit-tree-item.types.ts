export interface MilitaryUnitTreeItem {
  access_level: AccessLevel;
  children: MilitaryUnitTreeItem[];
  id: number;
  label: string;
  expanded?: boolean;
}

export interface AccessLevel {
  id: number;
  name: string;
}

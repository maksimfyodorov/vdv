export interface MilitaryUnitHierarchyItem {
  id: number;
  label: string;
  children?: MilitaryUnitHierarchyItem[];
  securityPercent?: number;
  staffingPercent?: number;
  totalRatio?: number;
  expanded?: boolean;
  valueRatio?: number;
  isMobile?: boolean;
}

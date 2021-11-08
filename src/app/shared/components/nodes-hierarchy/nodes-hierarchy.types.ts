export interface HierarchyFolder<T> {
  data: any;
  sidebarExpanded: boolean;
  deepLevel: number[];
  children?: HierarchyFolder<unknown>[];
  expanded?: boolean;
  selectedItem?: T;
}

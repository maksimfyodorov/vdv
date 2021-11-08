export interface UavSelectionHierarchy {
  status?: string;
  expanded?: boolean;
  id?: number | undefined;
  uuid?: string;
  label?: string;
  children?: UavSelectionHierarchy[];
  emitter?: string;
  access_level?: { id: number, name: string };
}

import { NavigationExtras } from '@angular/router';

export interface Breadcrumbs {
  label: string;
  url?: string;
}

export interface UavInformationTab {
  link: string;
  breadcrumbs: Breadcrumbs[];
  extras?: NavigationExtras;
}

export interface Tabs {
  header: string;
  index?: number;
  tasks: TabTasks[];
}

export interface TabTasks {
  title: string;
  description: string;
  routerLink: string;
}

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Task } from '../../../components/flight-plans/types/tasks';

export interface CoordinateModel {
  title: string;
  type: string;
  formControl: AbstractControl | FormGroup | FormControl;
}

export interface TaskModeGroup {
  mode: TaskMode;
  subordinate?: boolean;
}

export type TaskMode = 'new' | 'create' | 'completed' | 'not_completed' | 'planned' | 'view';

export interface TaskModalDynamicConfigData {
  mode?: TaskModeGroup;
  task?: Task;
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Tabs } from '../types/task.type';
import { environment } from '../../../../environments/environment';
import { combatCommandTabs } from '../infrastucture/combatCommandCategories';
import { dailyTabs } from '../infrastucture/dailyCategories';
import { allCategories } from '../infrastucture/allCategories';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  public tabs: Tabs[] = allCategories;
  public activeSectionIndex: number;
  public toggleStatus: boolean;
  public filteredOptions: Observable<any[]>;

  public searchForm: FormGroup = this.fb.group({
    searchControl: this.fb.control([]),
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.getCurrentCategories();
    this.checkOpenedTab();
    this.checkTaskToggleStatus();
    this.searchFilterInit();
  }

  public openClickedTask(routerLink: string): void {
    if (routerLink) {
      this.router.navigateByUrl(routerLink).finally();
    }
  }

  getCurrentCategories(): void {
    if (environment.isCombatCommandMode) {
      this.tabs = combatCommandTabs;
      return;
    }
    if (environment.isDailyMode) {
      this.tabs = dailyTabs;
      return;
    }
    if (environment.isAllMode) {
      this.tabs = allCategories;
      return;
    }
    this.tabs = allCategories;
  }

  public changeTab(event): void {
    localStorage.setItem('task_index_tab', event.index.toString());
  }

  public changeTaskToggleStatus(): void {
    localStorage.setItem('task_toggle', this.toggleStatus.toString());
  }

  private checkOpenedTab(): void {
    const openedIndexTab = localStorage.getItem('task_index_tab');

    if (openedIndexTab) {
      this.activeSectionIndex = Number(openedIndexTab);
    }
  }

  private checkTaskToggleStatus(): void {
    const localTaskToggle = localStorage.getItem('task_toggle');

    if (localTaskToggle === 'true') {
      this.toggleStatus = true;
    }

    if (localTaskToggle === 'false') {
      this.toggleStatus = false;
    }

    if (localTaskToggle === undefined) {
      localStorage.setItem('task_toggle', 'false');
    }
  }

  private searchFilterInit(): void {
    this.filteredOptions = this.searchForm.get('searchControl').valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val)),
    );
  }

  private filter(value: string): Tabs[] {
    if (value) {
      return this.tabs
        .map(group => ({ header: group.header, tasks: this.filterTasks(group.tasks, value) }))
        .filter(group => group.tasks.length > 0);
    }

    return this.tabs;
  }

  private filterTasks(tasks: any[], value: string): any[] {
    const filterValue = value.toLowerCase().trim();

    return tasks.filter(item =>
      item.title.toLowerCase().includes(filterValue)
      || item.description.toLowerCase().includes(filterValue),
    );
  }
}

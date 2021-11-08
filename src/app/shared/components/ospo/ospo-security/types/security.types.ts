import { TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface TechSettingsItem {
  name?: string;
  id?: number;
  uuid?: string;
  count: number;
}

export interface TechItem {
  name: string;
  uuid: string;
}

export interface SecurityHierarchy {
  total: SecurityTotal;
  hierarchy: Array<{ total: SecurityTotal; children: SecurityTech[] & any } & any>;
}

export interface SecurityTech extends TechItem {
  total: SecurityTotal;
  children: TechSecurityItem[];
}

export interface TechSecurityItem {
  number: number;
  uuid?: string;
  year: number;
  point: string;
  conditions: SecurityCondition;
  ports?: any;
  documents?: any;
  note?: string;
  repairs: Repair[];
  coordinate: any;
}

export type Repair = {
  uuid: string;
  sending_date: Date;
  receipt_date: Date;
  installation_date: Date;
  coordinate: any;
};

export interface SecurityCondition {
  stock: SecurityTechStatus;
  excess: SecurityTechStatus;
  lack: SecurityTechStatus;
  broken: SecurityTechStatus;
}

export interface SecurityTechStatus {
  uuid: string;
  name: string;
  status: boolean;
}

export interface SecurityTotal {
  state: number;
  stock: number;
  excess: number;
  lack: number;
  broken: number;
}

export interface ConditionValue {
  percents: number;
  current: number;
  total: number;
}

export type HierarchyMode = 'bp' | 'cn';

export interface SecurityTemplates {
  nodeTemplate: TemplateRef<HTMLElement>;
  summaryTemplate: TemplateRef<HTMLElement>;
  stateTemplate: TemplateRef<HTMLElement>;
  stockTemplate: TemplateRef<HTMLElement>;
  excessTemplate: TemplateRef<HTMLElement>;
  lackTemplate: TemplateRef<HTMLElement>;
  brokenTemplate: TemplateRef<HTMLElement>;
  controlsTemplate: TemplateRef<HTMLElement>;
  flightTemplate: TemplateRef<HTMLElement>;
  completedTemplate: TemplateRef<HTMLElement>;
  notCompletedTemplate: TemplateRef<HTMLElement>;
  choseViechleTemplate: TemplateRef<HTMLElement>;
}

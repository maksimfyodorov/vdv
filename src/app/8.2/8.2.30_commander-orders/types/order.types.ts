import { CoExecutor, Shdk } from './co-executor.types';
import { Coordinate } from './coordinate.types';
import { Decision } from './decision.types';
import { Executor } from './executor.types';
import { Customer } from './customer.types';
import { Report } from './report.types';

export interface Order {
  printInfo: PrintInfo,
  isExecuted: boolean;
  executionStatus: string;
  hasReport: boolean;
  executionDocumentsTotal: number;
  report: Report;
  decisionsDocumentsTotal: number;
  orderDocumentsTotal: number;
  documentsAreHidden: boolean;
  shdk: Shdk;
  executor: Executor;
  customer: Customer;

  name: string;
  description: string;
  date_of_receipt: string | Date;
  incoming_number: string;
  term_of_execution: string;
  customer_uuid: string;
  coordinate: Coordinate;
  document_uuid: string;
  additional_documents: AdditionalDocument[];
  co_executors: CoExecutor[];
  description_by_execution: string;
  status: OrderStatus;
  uuid: string;
  document: any;
  assignment_action_logs: string[];
  decisions: Decision[];

  id?: string | number;

  execution_notes?: string;
  execution_date?: string;
  decisions_documents_total: number;

  report_additional_documents?: any;
  report_document?: any;
}

export interface OrderResponse {
  result: Order[];
}

export interface AdditionalDocument {
  created_at?: string;
  name?: string;
  uuid: string;
}

export interface OrderStatus {
  name: string;
  color: string;
  uuid: string;
}

export interface PrintInfo {
  creationDate: string;
  incomingNumber: string;
  description: string;
  executionDate: string;
  militaryUnit: string;
  executor: string;
  orderDocuments: string[];
  reportDate: string;
  reportNumber: string;
  reportDocuments: string[];
  status: string;
}

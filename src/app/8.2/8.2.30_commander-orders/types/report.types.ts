import { AdditionalDocument } from './order.types';
import { Executor } from './executor.types';

export interface Report {
  document: any;
  execution_date: string
  description: string
  document_uuid: string
  additional_documents: AdditionalDocument[]
  executor: Executor
  co_executors: Executor[]
}

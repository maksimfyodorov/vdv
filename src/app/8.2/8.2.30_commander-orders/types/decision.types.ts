import { Document } from '../../../shared/components/ospo/documents/documents.types';

export interface Decision {
  previous_amount_of_documents: number;
  documents: Document[];
  name: string;
  decision: string;
  date?: string | Date;
  progress: string;
  status: DecisionStatus;
  uuid: string;

  id?: string | number;
  order_id?: string;
  description?: string;
  execution_date: string | Date;
}

export interface DecisionStatus {
  code: string;
  name: string;
  uuid: string;
}

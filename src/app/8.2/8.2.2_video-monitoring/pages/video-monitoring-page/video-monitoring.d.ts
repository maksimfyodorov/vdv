export interface BackendFixation {
  documents: unknown[];
  military_unit_id: number;
  number: string;
  ports: unknown[];
  specifications: {
    fixation_uuid: string;
    specification: { name: string; uuid: string };
    specification_uuid: string;
    value: string;
  }[];
  status: unknown;
  uuid: string;
  vvst_sample: {
    uuid: string;
    group: {
      uuid: string;
      code: string;
      name: string;
    };
    name: string;
    type: { name: string; uuid: string };
  };
  year: number;
}

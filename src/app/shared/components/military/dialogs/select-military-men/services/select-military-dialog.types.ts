export interface MilitaryMan {
  uuid: string;
  appointment: {
    uuid: string;
    name: string;
    VUS?: string;
  };
  surname: string;
  name: string;
  division?: any;
  rank: {
    uuid: string;
    name: string;
    category: {
      uuid: string;
      name: string;
      alias: string;
    };
  };
  middle_name?: string;
  shdk_uuid?: string;
  contacts: { contact_type: { uuid: string; name: string }; contact: string }[];
}

export interface BackendPaginationResponse<T> {
  count: number;
  result: T;
}

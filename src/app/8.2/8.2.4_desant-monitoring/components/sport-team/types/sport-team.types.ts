export interface SportsCategory {
  title: string;
  uuid: string;
}

export interface MilitarySportInfo {
  uuid: string;
  parachute_systems: {
    name: string;
    planned: number;
    done: number;
    incident: number;
  }[];
  aircraft: {
    name: string;
    planned: number;
    done: number;
    incident: number
  }[];
  military_units:
    {
      name: string;
      incident: number
    }[];
  jumping_on_tasks: {
    title: string;
    planned: number;
    done: number;
    incident: number;
    parachuteSystems: {
      name: string;
      planned: number;
      done: number;
      incident: number
    }[]
  }[];

  jumping_after_military_equipment: {
    title: string;
    planned: number;
    done: number;
    incident: number;
    parachuteSystems: string
  }[];
  jumping_in_military_equipment: {
    title: string;
    planned: number;
    done: number;
    incident: number;
    parachuteSystems: string
  }[];
  tech_jumping: {
    title: string;
    planned: number;
    done: number;
    incident: number;
    parachuteSystems: string;
  }[];
  sport_events: [{}];
  history: {
    date: number;
    event: string;
    uuid: string
  }[];
}

export interface SportEvents {
  date: number;
  event: string;
  uuid: string;
}

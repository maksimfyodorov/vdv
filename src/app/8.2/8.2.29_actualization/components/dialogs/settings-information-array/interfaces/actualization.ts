import { Track } from "../../setting-information-group/interfaces";
import { Waiting } from "../components/node/waiting";

export interface AllArrays {
    count: number,
    result: Actualization[]
}

export interface Actualization {
    identificator: string,
    uuid: string,
    name: string,
    size: string,
    update: string,
    files: Files[],
    responsible: Responsible,
}

export interface Responsible {
    name: string,
    appointment: string,
    rank: string,
}
export interface Files {
    file: string,
    date_plan: string,
    date_fact: string,
    status: string,
}

export interface CreateInformationArray {
    identificator: string,
    root_dir: string,
    responsible_uuid: string,
    supervising_uuid: string,
    military_unit_id: string,
    NCUO_id: string,
    group_uuid: string,
    tracks: Track[],
    waitings: Waiting[]
}
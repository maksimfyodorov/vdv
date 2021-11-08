import { Period } from './../../../../common-pages/settings/interfaces';
export interface JumpingStandard {
    category_name: string;
    division: JumpingDivision[];
    count_state: number;
    norm_jump: number;
}

export interface JumpingDivision {
    name: string;
    count: number;
}

export interface PostJumpingStandard {
    category_division_uuid: string;
    period_uuid: string;
    military_unit_id: number;
}

export interface PutJumpCount {
    uuid: string;
    jump_count: number;
}

export interface JumpingStandardTable {
    category_division: CategoryDivision;
    division_list: DivisionList[];
    norm_jump: null;
    period: Period;
    uuid: string;

}

export interface DivisionList {
    id: number;
    name: string;
}

export interface CategoryDivision {
    editable: boolean;
    name: string;
    uuid: string;
}


import { FormGroup } from "@angular/forms";
import { MilitaryMan } from "../../../shared/components/military/dialogs/select-military-men/services/select-military-dialog.types";
import { MilitaryUnitHierarchyItem } from "../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces";
import { Mark, MarkBackend } from "../../../shared/components/ospo/ospo-coordinates/types/mark";
import { GeneralInformation } from "./generalInformation";

export interface SummaryRequest {
    count: number,
    result: Summary[]
}

export interface Report {
    count: number,
    result: Mode[]
}

export interface ReportRecords {
    count: number,
    result: ReportRecord[],
}

export interface ReportResults {
    militaryCity: number,
    modeB: number,
    modeAV: number,
    ls: number,
    vvAT: number,
    vvBT: number,
    composition?: any,
}

export interface Summary {
    uuid?: string,
    number: number,
    date: string
    military_unit?: MilitaryUnitHierarchyItem,
    military_unit_id?: string,
    user?: User,
    status?: SummaryStatus,
    report?: GeneralInformation,
    info?: Count[],
    documents?: any,
}

export interface User {
    id: string,
    username: string,
    full_name: string,
}

export interface AddSummary {
    number: number,
    date: string,
    military_unit_id: number,
}

export interface SummaryStatus {
    uuid: string,
    status: string
}

export interface TextTemplate {
    text: string,
    report_type_uuid: string,
}

export interface Staff {
    report_uuid: string,
    any_text: string,
    uuid?: string,
}

export interface GetStaff {
    data: Staff[]
}

export interface ReportData {
    text: string,
    report_uuid: string,
    access: boolean,
    report_template_uuid: string,
    report_type_uuid: string,
}

export interface MilitaryCity {
    name: string,
    id: number,
    parent?: MilitaryCity,
    children?: MilitaryCity[],
    district_id?: string,
    garrison_id?: string,
    uuid?: string,
    coordinate?: Mark,
}

export interface MilitaryCityData {
    districts?: MilitaryCity[];
    data?: MilitaryCity[];
}

export interface AddMilitaryCity {
    name: string,
    district: string,
    garrison: string,
    coordinate_uuid: string,
    military_unit_id: number,
}

export interface TabView {
    index: number,
    originalEvent: PointerEvent,
}

export interface BCHS {
    amplification_objects?: AmplificationObjects[],
    mode_AB?: Mode[],
    mode_V?: Mode[],
    object_category: Mode,
    military_station?: MilitaryStation,
    military_station_uuid?: string,
    bchs_group?: Mode[],
    granting?: boolean,
    is_critical_facility?: boolean,
    uuid: string,
    report: GeneralInformation,
    groups?: BchsGroup[],
}

export interface AmplificationObjects {
    amplification_shdk_count: number,
    amplification_vvst_at_count: number,
    amplification_vvst_bt_count: number,
    amplification_work_time: AmplificationWorkTime,
    amplification_not_work_time: AmplificationWorkTime,
    amplification_object: AmplificationObject,
}

export interface AmplificationWorkTime {
    amplification_object_uuid: string,
    bchs_uuid: string,
    not_work_time: string,
    work_time: string,
}

export interface AmplificationObject {
    military_station_uuid?: string,
    name?: string,
    uuid?: string,
}

export interface MilitaryStation {
    amplification_object?: AmplificationObject[],
    coordinate?: MarkBackend,
    district?: string,
    garrison?: string,
    name: string,
    uuid: string,
}

export interface BchsGroup {
    name: string,
    not_work_time: Worktime,
    shdk_bchs_group_count: string,
    shdk_mode_ab_count: string,
    shdk_mode_v_count: string,
    uuid: string,
    vvst_bchs_count: string,
    work_time: Worktime,
    vvst_bchs_at_count: string,
    vvst_bchs_bt_count: string,
}

export interface Worktime {
    bchs_group_uuid: string,
    bchs_uuid: string,
    not_work_time?: string,
    work_time?: string,
}

export interface Mode {
    uuid: string,
    name: string,
}

export interface FormGroupValue extends FormGroup {
    value: formControlValue
}

export interface formControlValue {
    antiterrorGarrison: AntiterrorUnit,
    cityName: string,
    cityNumber: number,
    coordinates: string,
    functionGroup: AntiterrorUnit,
    liquidationDivision: AntiterrorUnit,
    mobileReserve: AntiterrorUnit,
    mode: AntiterrorUnit,
    reserve: AntiterrorUnit,
    strengthGarrison: AntiterrorUnit,
    strengthGarrisonArray: AntiterrorUnit,
}

export interface AntiterrorUnit {
    soldiers: any,
    work_time: any,
    not_work_time: any,
    autoTransport?: any,
    secondSoldiers?: any,
    armoredTransport?: any,
}

export interface ReportRecord {
    access: boolean
    report_template?: string,
    report_template_uuid?: string
    report_type?: Mode
    report_uuid: string
    text: string
    uuid?: string
}

export interface BchsGroup {
    data: Mode[];
}

export interface BchsTime {
    amplification_object_uuid?: string,
    bchs_group_uuid?: string,
    work_time?: string,
    not_work_time?: string,
}

export interface BCHSData {
    count: number,
    result: BCHS[]
}

export interface Count {
    count: string,
    name: string,
}

export interface AmplificationCreation {
    military_station_uuid?: string,
    name: string,
    amplification_object_uuid?: string,
}

export interface VvstTable {
    documents: any[],
    military_unit_id: string,
    number: string,
    ports: any[],
    repairs: any[],
    specifications: any[],
    status: VvstStatus,
    uuid: string,
    year: string,
    vvst_sample: VvstSample,
}

export interface VvstStatus {
    color: string,
    date: string,
    name: string,
    uuid: string,
}

export interface VvstSample {
    type: Mode,
    name: string,
    uuid: string,
    group: Group,
}

export interface Group {
    code?: string,
    VUS?: string,
    name: string,
    uuid: string,
}

export interface VvstBchs {
    data: Vvst[],
}

export interface Vvst {
    vvst: {
        military_unit: any,
        number: string,
        status: string,
        uuid: string,
        vvst_sample: VvstSample,
    }
}

export interface PostVvst {
    vvst_uuids: string[],
    amplification_object_uuid?: string,
    bchs_uuid: string,
    bchs_group_uuid?: string,
}

export interface SHDK {
    appointment: Group,
    group: Group,
    military_man: MilitaryMan,
    uuid: string,
    rank: {
        uuid: string;
        name: string;
        category: {
            uuid: string;
            name: string;
            alias: string;
        };
    },
    status: {
        date: string,
        name: string,
        note: string,
        uuid: string,
    }
}

export interface BchsShdk {
    bchs_group_uuid: string,
    bchs_uuid: string,
    shdk: SHDK,
}

export interface DataSHDK {
    data: BchsShdk[],
}

export interface FilterTable {
    startDate: Date,
    endDate: Date,
    inputSearch: string,
}

export interface PageParams {
    page: number,
    page_size: number,
    military_unit_id: number,
    military_near_tree?: boolean,
}
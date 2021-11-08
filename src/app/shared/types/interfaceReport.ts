export interface Report {
    uuid: string;
    sequentialNumber?: number;
    report?: string;
    user?: string;
    text?: string;
    report_type_uuid?: string;
}

export interface ReportTemplate {
    count: number,
    result: Report[]
}

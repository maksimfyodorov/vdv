export interface Task {
    name: string;
    editable: boolean;
    type: TaskType;
    code: number;
    uuid: string;
}

export interface TaskType {
    uuid: string;
    name: string;
}

export interface PutTask {
    uuid: string;
    type_uuid: string;
    name: string;
    code: number;
}

export interface PostTask {
    type_uuid: string;
    name: string;
    code?: number;
}
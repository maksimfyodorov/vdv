import { CategoryHierarchyModule } from './../components/ospo/category-hierarchy/category-hierarchy/category-hierarchy.module';
export interface CategoryDivisionHierarchy{
    id: number;
    accessLevel: AccessLevel;
    children: CategoryHierarchyModule[];
    label: string;
}

export interface AccessLevel {
    id: number;
    name: string;
}

export interface PutDivisionId {
    data: {
        division_id: number
    }[];
}

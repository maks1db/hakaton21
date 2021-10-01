export interface EmployeeDTO {
    name: string;
    art: string;
    clan: string;
    command: string;
    directorate: string;
    email: string;
    id: string;
    latitude: string;
    lead: string;
    logo: string;
    longitude: string;
    manager: string;
    phone: string;
    position: string;
    stream: string;
    telegram: string;
}

export interface FieldType {
    field: keyof EmployeeDTO;
}

export interface SortType extends FieldType {
    value: 1 | -1;
}

export interface FilterType extends FieldType {
    value: string;
}

export interface GroupType extends FieldType {}

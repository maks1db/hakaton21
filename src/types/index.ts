export interface WorkerDTO {
    name: string;
    // Должность
    position: string;
    phone: string;
    email: string;
    logo: string;
    telegram: string;
    // Арт
    art: string;
    // Команда
    command: string;
    // Директорат
    directorate: string;
    // Поток
    stream: string;
    // Руководиель
    manager: string;
    // Тех лид
    lead: string;
    longitude?: string;
    latitude?: string;
}

export interface FieldType {
    field: string;
}

export interface SortType extends Field {
    direction: 1 | -1;
}

export interface FilterType extends Field {
    value: string;
}

export interface GroupType extends Field {}

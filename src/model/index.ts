import { EmployeeDTO } from "../types";

export const scheme: Partial<Record<keyof EmployeeDTO, string>> = {
    name: "Сотрудник",
    art: "Арт",
    clan: "Клан",
    command: "Комманда",
    directorate: "Директорат",
    email: "email",
    lead: "Тим. лид",
    manager: "Руководитель",
    phone: "Телефон",
    position: "Должность",
    stream: "Стрим",
    telegram: "telegram",
    logo: 'Лого'
};

import { EmployeeDTO } from "../types";

export const scheme: Partial<Record<keyof EmployeeDTO, string>> = {
    art: "Арт",
    clan: "Клан",
    command: "Комманда",
    directorate: "Директорат",
    email: "email",
    lead: "Тим. лид",
    manager: "Руководитель",
    name: "Сотрудник",
    phone: "Телефон",
    position: "Должность",
    stream: "Стрим",
    telegram: "telegram",
};

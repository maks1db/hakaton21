import { EmployeeDTO } from "../types";
import { employees } from "./fixtures";

export const getEmployees = () =>
    new Promise<EmployeeDTO[]>((resolve) => {
        setTimeout(() => {
            resolve(employees);
        }, 1000);
    });

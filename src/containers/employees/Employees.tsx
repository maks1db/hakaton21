import { FC } from "react";
import { useSelector } from "react-redux";
import { getEmployeesSelector } from "../../selectors";
import { Card } from "./Card";

export const Employees: FC = () => {
    const { items } = useSelector(getEmployeesSelector);
    return (
        <table>
            <thead>
                <tr>
                    <th>Сотрудник</th>
                </tr>
            </thead>
            <tbody>
                {items.map((x) => (
                    <Card key={x.id} {...x} />
                ))}
            </tbody>
        </table>
    );
};

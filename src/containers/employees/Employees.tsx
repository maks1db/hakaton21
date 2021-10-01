import { FC } from "react";
import { useSelector } from "react-redux";
import { getResultSelector } from "../../selectors";
import { Card } from "./Card";

export const Employees: FC = () => {
    const { items } = useSelector(getResultSelector);
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

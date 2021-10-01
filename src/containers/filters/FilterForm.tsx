import { assocPath } from "ramda";
import { FC, Fragment } from "react";
import { getSchemeKey, getSchemeValue } from "../../helpers";
import { scheme } from "../../model";
import styles from "./FilterForm.module.css";

interface FilterFormProps {
    type: "field" | "fieldValue";
    onUpdate: (data: any) => void;
    data: { field: string; value?: string }[];
}

const values = Object.values(scheme).sort((a, b) => (a > b ? 1 : -1));

export const FilterForm: FC<FilterFormProps> = ({ type, data, onUpdate }) => {
    const isTwoFieldsCount = type === "fieldValue";

    return (
        <>
            <div className={styles.formControls}>
                <button className="button">+</button>
                <button className="button">-</button>
            </div>
            <table className={styles.formTable}>
                <thead>
                    <tr>
                        <th>Поле</th>
                        {isTwoFieldsCount && <th>Значение</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ field, value }, ind) => (
                        <tr key={ind}>
                            <td>
                                <select
                                    value={getSchemeValue(field)}
                                    onChange={(e) => {
                                        const key = getSchemeKey(
                                            e.target.value
                                        );

                                        if (key) {
                                            const newData = assocPath(
                                                [ind, "field"],
                                                key
                                            );
                                            onUpdate(newData);
                                        }
                                    }}
                                >
                                    {values.map((x) => (
                                        <option key={x}>{x}</option>
                                    ))}
                                </select>
                            </td>
                            {isTwoFieldsCount && (
                                <td>
                                    <input value={value} />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

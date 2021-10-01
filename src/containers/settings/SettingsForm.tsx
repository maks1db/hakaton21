import { assocPath, remove } from "ramda";
import { FC, useState, useEffect } from "react";
import { getSchemeKey, getSchemeValue } from "../../helpers";
import { scheme } from "../../model";
import styles from "./SettingsForm.module.css";
import cn from "classnames";

interface SettingsFormProps {
    type: "field" | "fieldValue";
    onUpdate: (data: any) => void;
    data: { field: string; value?: string }[];
}

const values = Object.values(scheme).sort((a, b) => (a > b ? 1 : -1));
const keys = Object.keys(scheme);

export const SettingsForm: FC<SettingsFormProps> = ({
    type,
    data,
    onUpdate,
}) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const isTwoFieldsCount = type === "fieldValue";

    useEffect(() => {
        setActiveIndex(-1);
    }, [data]);

    return (
        <>
            <div className={styles.formControls}>
                <button
                    className="button"
                    onClick={() => onUpdate([...data, { field: keys[0] }])}
                >
                    +
                </button>
                <button
                    className="button"
                    disabled={activeIndex < 0}
                    onClick={() => {
                        onUpdate(remove(activeIndex, 1, data));
                        setActiveIndex(-1);
                    }}
                >
                    -
                </button>
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
                        <tr
                            key={ind}
                            className={cn(activeIndex === ind && styles.active)}
                            onClick={(e) => {
                                // @ts-ignore
                                if (["tr", "td"].includes(e.target.localName)) {
                                    setActiveIndex(
                                        activeIndex === ind ? -1 : ind
                                    );
                                }
                            }}
                        >
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
                                                key,
                                                data
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
                                    <input
                                        value={value}
                                        onChange={(e) => {
                                            const newData = assocPath(
                                                [ind, "value"],
                                                e.target.value,
                                                data
                                            );
                                            onUpdate(newData);
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

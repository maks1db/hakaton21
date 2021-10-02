import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { getResultSelector, getListFieldsSelector } from "../../selectors";

import { getSchemeValue } from "../../helpers";
import { fieldTemplates, parseFieldTemplates } from "./utils";
import styles from "./List.module.css";
import { range } from "ramda";

parseFieldTemplates();

const GROUP_COLORS = ["#edeff0", "#f4f5f6", "#fafbfb"];

export const List: FC = () => {
    const { groups } = useSelector(getResultSelector);
    const fields = useSelector(getListFieldsSelector);

    const groupRange = range(1, fields.length);

    return (
        <table>
            <thead>
                <tr>
                    {fields.map((field, ind) => (
                        <th key={ind}>{getSchemeValue(field)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {groups.map(({ items, ...group }, ind) => (
                    <Fragment key={ind}>
                        {Object.values(group).map((x, groupIndex) => (
                            <tr
                                key={x}
                                className={styles.group}
                                style={{
                                    backgroundColor: GROUP_COLORS[groupIndex],
                                }}
                            >
                                <td
                                    style={{
                                        paddingLeft: `${groupIndex * 16}px`,
                                    }}
                                >
                                    {x}
                                </td>
                                {groupRange.map((r) => (
                                    <td key={r} />
                                ))}
                            </tr>
                        ))}
                        {items.map((x) => (
                            <tr key={x.id}>
                                {fields.map((field, ind) => {
                                    const html = (
                                        fieldTemplates[field] || ""
                                    ).replace("{{value}}", x[field]);
                                    return (
                                        <Fragment key={ind}>
                                            {!html && <td>{x[field]}</td>}
                                            {html && (
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: html,
                                                    }}
                                                />
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </tr>
                        ))}
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
};

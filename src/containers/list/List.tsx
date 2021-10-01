import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { getResultSelector } from "../../selectors";

import { State } from "../../reducers";
import { getSchemeValue } from "../../helpers";
import { fieldTemplates, parseFieldTemplates } from "./utils";

const mapState = (state: State) => ({
    fields: state.settings.fields,
});

parseFieldTemplates();

export const List: FC = () => {
    const { items } = useSelector(getResultSelector);
    const { fields } = useSelector(mapState);

    return (
        <table>
            <thead>
                <tr>
                    {fields.map(({ field }, ind) => (
                        <th key={ind}>{getSchemeValue(field)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((x) => (
                    <tr key={x.id}>
                        {fields.map(({ field }, ind) => {
                            const html = (fieldTemplates[field] || "").replace(
                                "{{value}}",
                                x[field]
                            );
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
            </tbody>
        </table>
    );
};

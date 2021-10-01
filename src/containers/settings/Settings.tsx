import cn from "classnames";
import { FC, useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { updateSetting } from "../../reducers/settings/";
import { State } from "../../reducers";
import { SettingsStateType } from "../../reducers/settings/types";
import styles from "./Settings.module.css";
import { SettingsForm } from "./SettingsForm";

const mapState = (state: State) => ({
    settings: state.settings,
});

const mapTypes: Record<keyof State["settings"], any> = {
    fields: { type: "field", title: "Колонки" },
    groups: { type: "fieldValue", title: "Группировка" },
    sort: { type: "field", title: "Сортировка" },
    filters: { type: "fieldValue", title: "Фильтры" },
};

const mapEntries = Object.entries(mapTypes);

export const Settings: FC = () => {
    const dispatch = useDispatch();
    const [settingName, setSettingName] = useState<
        keyof SettingsStateType | ""
    >("");

    const { settings } = useSelector(mapState);

    const handleClick = useCallback(
        (e) => {
            const { name } = e.target;

            setSettingName(settingName === name ? "" : name);
        },
        [settingName]
    );
    return (
        <div>
            <div className={styles.filters}>
                {mapEntries.map(([key, { title }]) => (
                    <button
                        name={key}
                        onClick={handleClick}
                        key={key}
                        className={cn(
                            "button",
                            settingName === key && "button-outline"
                        )}
                    >
                        {title}
                    </button>
                ))}
            </div>

            <CSSTransition
                in={settingName !== ""}
                classNames="filters"
                timeout={300}
                unmountOnExit
            >
                <div className={styles.form}>
                    {settings[settingName] && (
                        <SettingsForm
                            data={settings[settingName]}
                            onUpdate={(data) =>
                                dispatch(
                                    updateSetting({
                                        // @ts-ignore
                                        setting: settingName,
                                        data,
                                    })
                                )
                            }
                            type={mapTypes[settingName]?.type}
                        />
                    )}
                </div>
            </CSSTransition>
        </div>
    );
};

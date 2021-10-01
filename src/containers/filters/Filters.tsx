import { FC, useState, useCallback, useRef } from "react";
import styles from "./Filters.module.css";
import { CSSTransition } from "react-transition-group";
import { SettingsStateType } from "../../reducers/settings/types";
import { FilterForm } from "./FilterForm";
import { useSelector } from "react-redux";
import { State } from "../../reducers";
import cn from "classnames";

const mapState = (state: State) => ({
    settings: state.settings,
});

const mapTypes: Record<keyof State["settings"], any> = {
    fields: { type: "field", title: "Поля" },
    groups: { type: "fieldValue", title: "Группировка" },
    sort: { type: "field", title: "Сортировка" },
    filters: { type: "fieldValue", title: "Фильтры" },
};

const mapEntries = Object.entries(mapTypes);

export const Filters: FC = () => {
    const [filterName, setFilterName] = useState<keyof SettingsStateType | "">(
        ""
    );

    const { settings } = useSelector(mapState);
    const timer = useRef<any>();

    const items = useRef();
    const handleClick = useCallback(
        (e) => {
            const { name } = e.target;
            setFilterName("");
            clearTimeout(timer.current);
            if (filterName === name) {
                return;
            }
            timer.current = setTimeout(
                () => {
                    items.current = settings[name];
                    setFilterName(name);
                },
                filterName === "" ? 0 : 350
            );
        },
        [filterName]
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
                            filterName === key && "button-outline"
                        )}
                    >
                        {title}
                    </button>
                ))}
            </div>

            <CSSTransition
                in={filterName !== ""}
                classNames="filters"
                timeout={300}
                unmountOnExit
            >
                <div className={styles.form}>
                    {items.current && (
                        <FilterForm
                            data={items.current}
                            onUpdate={console.log}
                            type={mapTypes[filterName]?.type}
                        />
                    )}
                </div>
            </CSSTransition>
        </div>
    );
};

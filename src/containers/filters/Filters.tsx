import { FC } from "react";
import styles from "./Filters.module.css";

export const Filters: FC = () => (
    <div className={styles.filters}>
        <button>Поля</button>
        <button>Группировка</button>
        <button>Сортировка</button>
        <button>Фильтры</button>
    </div>
);

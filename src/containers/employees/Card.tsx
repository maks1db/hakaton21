import { FC } from "react";
import { EmployeeDTO } from "../../types";
import styles from "./Card.module.css";
import { ObserveredImage } from "../../components/ObserveredImage";

export const Card: FC<EmployeeDTO> = ({ name, clan, command, logo }) => (
    <div className={styles.card}>
        <div className={styles.group}>
            <div className={styles.content}>
                <h5>{name}</h5>
                <h6>{clan}</h6>
                <p>{command}</p>
            </div>
            <div className={styles.image}>
                <ObserveredImage
                    element="div"
                    url={logo}
                    className={styles.logo}
                />
            </div>
        </div>
    </div>
);

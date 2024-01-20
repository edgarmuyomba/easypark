import styles from "./new_sensor.module.css";
import bg from "../../assets/new_sensor.png"
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export default function NewSensor() {
    return (
        <div className={styles.container}>
            <div className={styles.image} style={{ backgroundImage: `url(${bg})`}}></div>
            <div className={styles.formCont}>
                <div className={styles.header}>
                    <p className={styles.heading}>
                        Register a new sensor 
                    </p>
                    <div className={styles.close}>
                        <Icon path={mdiClose} size={0.7} color="tomato" />
                    </div>
                </div>
                <div className={styles.body}>
                    
                </div>
            </div>
        </div>
    )
}
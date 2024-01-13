import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiViewDashboard, mdiParking, mdiAvTimer, mdiAccountSettings, mdiSmokeDetector, mdiChartBox } from "@mdi/js";

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <ul className={styles.links}>
                <Link id={styles.active}>
                    <li className={styles.link}>
                        <Icon path={mdiViewDashboard} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Dashboard</p>
                    </li>
                </Link>
                <Link id={styles.tab}>
                    <li className={styles.link}>
                        <Icon path={mdiParking} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Parking Lots</p>
                    </li>
                </Link>
                <Link id={styles.tab}>
                    <li className={styles.link}>
                        <Icon path={mdiAvTimer} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Sessions</p>
                    </li>
                </Link>
                <Link id={styles.tab}>
                    <li className={styles.link}>
                        <Icon path={mdiAccountSettings} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Users</p>
                    </li>
                </Link>
                <Link id={styles.tab}>
                    <li className={styles.link}>
                        <Icon path={mdiSmokeDetector} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Sensors</p>
                    </li>
                </Link>
                <Link id={styles.tab}>
                    <li className={styles.link}>
                        <Icon path={mdiChartBox} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Reports</p>
                    </li>
                </Link>
            </ul>
            <footer className={styles.footer}>
                <p className={styles.text}>
                    Copyright &copy; CS24-9
                </p>
            </footer>
        </aside>
    )
}
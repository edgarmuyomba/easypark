import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import Icon from "@mdi/react";
import { mdiViewDashboard, mdiParking, mdiAvTimer, mdiAccountSettings, mdiSmokeDetectorVariant, mdiChartBox } from "@mdi/js";

import SideContext from '../../Context';

export default function Sidebar() {
    
    const { active, setActive } = useContext(SideContext);

    return (
        <aside className={styles.sidebar}>
            <ul className={styles.links}>
                <Link id={active == 1 ? styles.active : styles.tab} onClick={() => setActive(1)} to="/">
                    <li className={styles.link}>
                        <Icon path={mdiViewDashboard} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Dashboard</p>
                    </li>
                </Link>
                <Link id={active == 2 ? styles.active : styles.tab} onClick={() => setActive(2)} to="parking_lots">
                    <li className={styles.link}>
                        <Icon path={mdiParking} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Parking Lots</p>
                    </li>
                </Link>
                <Link id={active == 3 ? styles.active : styles.tab} onClick={() => setActive(3)} to="sessions">
                    <li className={styles.link}>
                        <Icon path={mdiAvTimer} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Sessions</p>
                    </li>
                </Link>
                <Link id={active == 4 ? styles.active : styles.tab} onClick={() => setActive(4)} to="users">
                    <li className={styles.link}>
                        <Icon path={mdiAccountSettings} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Users</p>
                    </li>
                </Link>
                <Link id={active == 5 ? styles.active : styles.tab} onClick={() => setActive(5)} to="sensors">
                    <li className={styles.link}>
                        <Icon path={mdiSmokeDetectorVariant} size={1} color="rgb(241, 241, 241)" />
                        <p className={styles.name}>Sensors</p>
                    </li>
                </Link>
                <Link id={active == 6 ? styles.active : styles.tab} onClick={() => setActive(6)} to="reports">
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
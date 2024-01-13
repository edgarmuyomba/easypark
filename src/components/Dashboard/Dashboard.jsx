import styles from "./styles.module.css";

import Icon from "@mdi/react";
import { mdiAccountMultiple, mdiSmokeDetectorVariant, mdiCash, mdiPercentBoxOutline, mdiAvTimer, mdiParking } from "@mdi/js";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <div className={styles.users}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiAccountMultiple} size={0.8} color="white" />
                    </div>
                    <p className={styles.text}>Users</p>
                </div>
            </div>
            <div className={styles.sensors}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiSmokeDetectorVariant} size={0.8} color="white" />
                    </div>
                    <p className={styles.text}>Sensors</p>
                </div>
            </div>
            <div className={styles.income}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiCash} size={0.8} color="white" />
                    </div>
                    <p className={styles.text}>Expected Income</p>
                </div>
            </div>
            <div className={styles.occupancy}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiPercentBoxOutline} size={0.8} color="white" />
                    </div>
                    <p className={styles.text}>Total Occupany</p>
                </div>
            </div>
            <div className={styles.session_tracking}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiAvTimer} size={0.8} color="white" />
                    </div>
                    <p className={styles.text}>Session Tracking</p>
                </div>
            </div>
            <div className={styles.parking_lots}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiParking} size={0.8} color="white" />
                    </div>
                    <p className={styles.text}>Parking Lots</p>
                </div>
            </div>
        </div>
    );
}
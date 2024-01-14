import styles from "./styles.module.css";
import income from '../../assets/income.png'

import Icon from "@mdi/react";
import { mdiAccountMultiple, mdiSmokeDetectorVariant, mdiCash, mdiPercentBoxOutline, mdiAvTimer, mdiParking, mdiHelpCircleOutline, mdiMenuUp } from "@mdi/js";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <div className={styles.users}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiAccountMultiple} size={0.6} color="white" />
                    </div>
                    <p className={styles.text}>Users</p>
                    <Icon className={styles.tool} path={mdiHelpCircleOutline} size={0.6} color="grey" title="Total number of users" />
                </div>
                <div className={styles.value}>
                    <p className={styles.textValue}>
                        2000
                    </p>
                    <Icon className={styles.up} path={mdiMenuUp} size={1.2} color="green" />
                </div>
            </div>
            <div className={styles.sensors}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiSmokeDetectorVariant} size={0.6} color="white" />
                    </div>
                    <p className={styles.text}>Active Sensors</p>
                    <Icon className={styles.tool} path={mdiHelpCircleOutline} size={0.6} color="grey" title="Total number of deployed sensors" />
                </div>
                <div className={styles.value}>
                    <p className={styles.textValue}>
                        2000
                    </p>
                    <Icon className={styles.up} path={mdiMenuUp} size={1.2} color="green" />
                </div>
            </div>
            <div className={styles.income}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiCash} size={0.6} color="white" />
                    </div>
                    <p className={styles.text}>Expected Income</p>
                    <Icon className={styles.tool} path={mdiHelpCircleOutline} size={0.6} color="grey" title="Expected income from user sessions" />
                </div>
                <div className={styles.value}>
                    <p className={styles.textValue}>
                        2000
                    </p>
                    <Icon className={styles.up} path={mdiMenuUp} size={1.2} color="green" />
                </div>
            </div>
            <div className={styles.occupancy}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiPercentBoxOutline} size={0.6} color="white" />
                    </div>
                    <p className={styles.text}>Total Occupany</p>
                    <Icon className={styles.tool} path={mdiHelpCircleOutline} size={0.6} color="grey" title="Total parking lot occupancy" />
                </div>
                <div className={styles.value}>
                    <p className={styles.textValue2}>
                        68%
                    </p>
                    <meter className={styles.perc_occu} value="68" min="0" max="100" />
                </div>
            </div>
            <div className={styles.session_tracking}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiAvTimer} size={0.6} color="white" />
                    </div>
                    <p className={styles.text}>Session Tracking</p>
                    <Icon className={styles.tool} path={mdiHelpCircleOutline} size={0.6} color="grey" title="User sessions analysis per hour" />
                </div>
                <div className={styles.value}>
                    2000
                </div>
            </div>
            <div className={styles.parking_lots}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Icon path={mdiParking} size={0.6} color="white" />
                    </div>
                    <p className={styles.text}>Parking Lots</p>
                    <Icon className={styles.tool} path={mdiHelpCircleOutline} size={0.6} color="grey" title="Registered parking lots" />
                </div>
                <div className={styles.value}>
                    2000
                </div>
            </div>
        </div>
    );
}
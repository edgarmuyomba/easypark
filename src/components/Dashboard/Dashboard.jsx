import styles from "./styles.module.css";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <div className={styles.users}>
                Users
            </div>
            <div className={styles.sensors}>
                Sensors
            </div>
            <div className={styles.income}>
                Income
            </div>
            <div className={styles.occupancy}>
                Occupancy 
            </div>
            <div className={styles.session_tracking}>
                Session Tracking 
            </div>
            <div className={styles.parking_lots}>
                Parking Lots
            </div>
        </div>
    );
}
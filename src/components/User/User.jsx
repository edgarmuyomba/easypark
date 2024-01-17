import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import styles from "./styles.module.css"
import Icon from "@mdi/react";
import { mdiEmailOutline, mdiMapMarkerOutline, mdiCalendarClockOutline } from "@mdi/js";
import BeatLoader from "react-spinners/BeatLoader";

export default function User() {

    const { user_id } = useParams();

    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/user_sessions/${user_id}/`);
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.log("Failed to fetch user sessions", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    if (loading) {
        return (
            <div className={styles.loading}>
                <BeatLoader
                    color="rgb(21, 31, 44)"
                    loading={loading}
                    size={10}
                />
            </div>
        )
    }

    return (
        <div className={styles.user}>
            <div className={styles.header}>
            </div>
            <div className={styles.details}>
                <div className={styles.image}></div>
                <div className={styles.bio}>
                    <div className={styles.text}>
                        <p className={styles.name}>Name</p>
                    </div>
                    <div className={styles.text}>
                        <Icon path={mdiEmailOutline} size={0.7} />
                        <p className={styles.email}>Email</p>
                    </div>
                    <div className={styles.text}>
                        <Icon path={mdiMapMarkerOutline} size={0.7} />
                        <p className={styles.location}>Location</p>
                    </div>
                    <div className={styles.text}>
                        <Icon path={mdiCalendarClockOutline} size={0.7} />
                        <p className={styles.activity}>Activity</p>
                    </div>
                </div>
            </div>
            <div className={styles.sessions}>
                <div className={styles.seshHeader}>
                    <p className={styles.headText}>Previous User Sessions</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
                <div className={styles.session}>
                    <p className={styles.slotNo}>Slot Number</p>
                    <p className={styles.time}>8th January, 2023</p>
                    <p className={styles.amount}>UGX 3500</p>
                </div>
            </div>
        </div>
    )
}
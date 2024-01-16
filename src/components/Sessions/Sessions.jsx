import BeatLoader from "react-spinners/BeatLoader";
import styles from "./styles.module.css";

import { useState, useEffect } from "react";

export default function Sessions() {

    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState({});
    const [display, setDisplay] = useState([]);
    const [active, setActive] = useState(0);

    function processSessions(sessions) {
        let results = {};

        for (let session of sessions) {
            if (results.hasOwnProperty(session.lot)) {
                results[session.lot].push(session);
            } else {
                results[session.lot] = [session];
            }
        }

        return results;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/parking_sessions/");
                const data = await response.json();
                let sesh = processSessions(data);
                setSessions(sesh);
                setDisplay(Object.values(sesh)[0]);
            } catch (error) {
                console.log("Failed to fetch the data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

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
    } else {

        return (
            <div className={styles.sessions}>
                <div className={styles.lots}>
                    {
                        Object.keys(sessions).map((lot, index) => {
                            return (
                                <div key={index} style={active === index ? { backgroundColor: "rgb(209, 209, 209)"} : null} className={styles.lot} onClick={() => { setDisplay(sessions[lot]); setActive(index); }}>
                                    <p className={styles.text}>{lot}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.lotSessions}>
                    {
                        display.map((sesh, index) => {
                            return (
                                <div key={index} className={styles.session}>
                                    <p className={styles.slotNo}>{sesh.slot_number}</p>
                                    <p className={styles.time}>{sesh.parked_on}</p>
                                    <p className={styles.amount}>UGX {sesh.amount_accumulated}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
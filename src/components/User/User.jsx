import { useEffect, useState, useRef } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom"

import styles from "./styles.module.css"
import Icon from "@mdi/react";
import { mdiEmailOutline, mdiMapMarkerOutline, mdiCalendarClockOutline, mdiTrashCanOutline, mdiPlus } from "@mdi/js";
import BeatLoader from "react-spinners/BeatLoader";

import baseUrl from "../../serverUrl";

export default function User() {

    const { user_id } = useParams();

    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);

    const messageRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/user_sessions/${user_id}/`);
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

    const handleDelete = async () => {
        try {
            const response = await fetch(`${baseUrl}/delete_user/${user_id}/`, { method: "DELETE" });
            const data = await response.json();
            if (response.status === 200) {
                navigate("/users");
            } else {
                // display error
                messageRef.current.textContent = "Failed to complete delete process";
                messageRef.current.className = styles.show;
                messageRef.current.style.top = "0";
                setTimeout(() => {
                    messageRef.current.className = styles.hide;
                    messageRef.current.style.top = "-120px";
                }, 3000);
                messageRef.current.className = styles.message;
            }
        } catch (error) {
            // display failure
            messageRef.current.textContent = "Please check your internet connection";
            messageRef.current.className = styles.show;
            messageRef.current.style.top = "0";
            setTimeout(() => {
                messageRef.current.className = styles.hide;
                messageRef.current.style.top = "-120px";
            }, 3000);
            messageRef.current.className = styles.message;
        }
    }

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
            <div className={styles.user}>
                <div ref={messageRef} className={styles.message}>
                </div>
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
                            <p className={styles.activity}>{sessions.length > 0 ? sessions[0].parked_on : "No Data"}</p>
                        </div>
                        <div className={styles.delete} onClick={() => handleDelete()}>
                            <Icon path={mdiTrashCanOutline} size={0.7} />
                            <p className={styles.delete}>Delete</p>
                        </div>
                    </div>
                </div>
                <div className={styles.sessions}>
                    <div className={styles.seshHeader}>
                        <p className={styles.headText}>Previous User Sessions</p>
                    </div>
                    {
                        sessions.map((sesh, index) => {
                            return (
                                <div key={index} className={styles.session}>
                                    <p className={styles.slotNo}>{sesh.slot_number}</p>
                                    <p className={styles.time}>{sesh.parked_on}</p>
                                    <p className={styles.amount}>UGX {sesh.amount_accumulated}</p>
                                </div>
                            )
                        })
                    }
                    <div className={styles.new_session}>
                        <Icon path={mdiPlus} size={0.7} />
                    </div>
                </div>
            </div>
        )
    }
}
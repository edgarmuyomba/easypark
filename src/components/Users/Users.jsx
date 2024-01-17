import { useState, useEffect } from "react";

import styles from "./styles.module.css";
import BeatLoader from "react-spinners/BeatLoader";
import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiMagnify } from "@mdi/js";
import ToggleSwitch from "./ToggleSwitch";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filterText, setFilterText] = useState("");
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/users/");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log("Error loading users", data);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    })

    function userLastActivity(user) {
        let activity = user.sessions[0];
        if (activity !== undefined) {
            return activity.parked_on
        } else return "Nil";
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
            <div className={styles.users}>
                <div className={styles.filterSearch}>
                    <div className={styles.search}>
                        <Icon path={mdiMagnify} size={0.7} color="green" />
                        <input 
                            type="text" 
                            name="search" 
                            id="" 
                            placeholder="Filter by name or email"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            autocomplete="off"
                            />
                    </div>
                    <div className={styles.filter}>
                        <p className={styles.text}>Only show active users</p>
                        <ToggleSwitch
                            checked={active}
                            onChange={() => setActive((active) => !active)} 
                        />
                    </div>
                </div>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <ul className={styles.titles}>
                            <li className={styles.title}>Name</li>
                            <li className={styles.title}>Email</li>
                            <li className={styles.title}>Last Activity</li>
                            <li className={styles.title}>Active</li>
                        </ul>
                    </div>
                    <div className={styles.body}>
                        {
                            users.map((user, index) => {
                                // perform name filtering here
                                return (
                                    <div key={index} className={styles.user}>
                                        <ul className={styles.fields}>
                                            <li className={styles.field}>Name</li>
                                            <li className={styles.field}>Email</li>
                                            <li className={styles.field}>{userLastActivity(user)}</li>
                                            <li className={styles.field}>
                                                <div className={styles.actions}>
                                                    <div className={styles.active}>
                                                        <div className={styles.yes}>Yes</div>
                                                        <div className={styles.no}>No</div>
                                                    </div>
                                                    <div className={styles.delete}>
                                                        <Icon className={styles.delete} path={mdiTrashCanOutline} size={0.7} />
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }
} 
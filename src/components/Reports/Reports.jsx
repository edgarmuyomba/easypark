import styles from "./styles.module.css"

import { useContext, useEffect, useState } from "react"
import SideContext from '../../Context'

export default function Reports() {

    const { updateActive } = useContext(SideContext);

    const [type, setType] = useState("");
    const [filter, setFilter] = useState("");
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        let result = [];
        switch (type) {
            case "parking_lots":
                result = ["Occupancy Trends", "Revenue Analysis", "Time Analysis", "Maintenance Needs"];
                break;
            case "sessions":
                result = ["Usage Patterns", "Peak Usage Hours", "Session Duration", "Session Distribution"];
                break;
            case "users":
                result = ["User Activity", "Access Patterns", "User Engagement"];
                break;
            case "sensors":
                result = ["Health and Status", "Maintenance Requirements", "Alert History"];
                break;
            case "all":
                result = ["Occupancy Trends", "Revenue Analysis", "Time Analysis", "Maintenance Needs", "Usage Patterns", "Peak Usage Hours", "Session Duration", "Session Distribution", "User Activity", "Access Patterns", "User Engagement", "Health and Status", "Maintenance Requirements", "Alert History"];
                break;
        }
        setTitles(result);
    }, [type])

    useEffect(() => {

        updateActive(6);
        setType("all");

    }, [])

    return (
        <div className={styles.reports}>
            <div className={styles.header}>
                <div className={styles.select}>
                    <label htmlFor="types">Type:</label>
                    <select name="types" id="types" className={styles.types} onChange={(e) => setType(e.target.value)}>
                        <option className={styles.type} value="all">All</option>
                        <option className={styles.type} value="parking_lots">Parking Lots</option>
                        <option className={styles.type} value="sessions">Sessions</option>
                        <option className={styles.type} value="users">Users</option>
                        <option className={styles.type} value="sensors">Sensors</option>
                    </select>
                </div>
                <div className={styles.filter}>
                    <input type="text" name="filter" id="filter" placeholder="Filter by params" onChange={(e) => setFilter(e.target.value)} />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.titles}>
                    <ul className={styles.list}>
                        {
                            titles.map((title, index) => {
                                return (
                                    <li key={index} className={styles.title}>{title}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.format}></div>
            </div>
        </div>
    )
}
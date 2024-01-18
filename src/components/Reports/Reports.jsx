import styles from "./styles.module.css"
import report_structure from "./report_structure.json"

import { useContext, useEffect, useState } from "react"
import SideContext from '../../Context'
import getCurrentTime from "./currentTime"

import Icon from "@mdi/react";
import { mdiPencilOutline, mdiFileDocumentOutline, mdiDownloadBoxOutline, mdiEmailOutline } from "@mdi/js";

export default function Reports() {

    const { updateActive } = useContext(SideContext);

    const [type, setType] = useState("");
    const [filter, setFilter] = useState("");
    const [titles, setTitles] = useState([]);
    const [display, setDisplay] = useState({ id: 0, value: "" });
    const [details, setDetails] = useState([]);

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
        setDisplay({ id: 1, value: result[0] });
        setDetails(report_structure.reports[type]);
    }, [type])

    useEffect(() => {

        updateActive(6);
        setType("all");
        setDetails(report_structure.reports["all"]);

    }, [])

    return (
        <div className={styles.reports}>
            <div className={styles.header}>
                <div className={styles.select}>
                    <label htmlFor="types">Type:</label>
                    <select name="types" id="types" defaultValue={type} className={styles.types} onChange={(e) => setType(e.target.value)}>
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
                    <div className={styles.head}>
                        <p>No</p>
                        <p>Report Title</p>
                    </div>
                    <ul className={styles.list}>
                        {
                            titles.map((title, index) => {
                                return (
                                    <li key={index} className={title === display.value ? styles.display : styles.title} onClick={() => setDisplay({ id: index + 1, value: title })}>
                                        <p>{index + 1}</p>
                                        <p>{title}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.format}>
                    <div className={styles.title}>
                        <p className={styles.index}>{display.id}.</p>
                        <p className={styles.name}>{display.value}</p>
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <Icon path={mdiPencilOutline} size={0.65} color="white" />
                            <p className={styles.text}>Edit</p>
                        </div>
                        <div className={styles.action}>
                            <Icon path={mdiFileDocumentOutline} size={0.65} color="white" />
                            <p className={styles.text}>View</p>
                        </div>
                        <div className={styles.action}>
                            <Icon path={mdiDownloadBoxOutline} size={0.65} color="white" />
                            <p className={styles.text}>Download</p>
                        </div>
                        <div className={styles.action}>
                            <Icon path={mdiEmailOutline} size={0.65} color="white" />
                            <p className={styles.text}>Send on email</p>
                        </div>
                    </div>
                    <div className={styles.info}>
                        {
                            details.map((detail, index) => {
                                return detail.report === display.value
                                    ? (
                                        <>
                                            <section className={styles.bio}>
                                                <div className={styles.tile}>
                                                    <p className={styles.type}>Name</p>
                                                    <p className={styles.txt}>{detail.report}</p>
                                                </div>
                                                <div className={styles.tile}>
                                                    <p className={styles.type}>Format</p>
                                                    <p className={styles.txt}>PDF</p>
                                                </div>
                                                <div className={styles.tile}>
                                                    <p className={styles.type}>Status</p>
                                                    <div className={styles.ready}> {/* others are not ready and loading*/}
                                                        <p className={styles.txt}>Ready</p>
                                                    </div>
                                                </div>
                                                <div className={styles.tile}>
                                                    <p className={styles.type}>Created</p>
                                                    <p className={styles.txt}>{getCurrentTime()}</p>
                                                </div>
                                            </section>

                                            <section className={styles.duration}>
                                                <p className={styles.title}>Duration</p>
                                                <div className={styles.tile}>
                                                    <p className={styles.type}>Start Date</p>
                                                    <div className={styles.period}>
                                                        <p className={styles.txt}>Now</p>
                                                    </div>
                                                </div>
                                                <div className={styles.tile}>
                                                    <p className={styles.type}>End Date</p>
                                                    <div className={styles.period}>
                                                        <p className={styles.txt}>Now</p>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className={styles.col_headers}>
                                                <p className={styles.title}>Column Headers</p>
                                                {
                                                    detail.columns.map((column, index) => {
                                                        return (
                                                            <div key={index} className={styles.column}>
                                                                <p className={styles.type}>{column.header}</p>
                                                                <div className={styles.col_header}>
                                                                    <p className={styles.col}>{column.description}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </section>
                                        </>
                                    )
                                    : null
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
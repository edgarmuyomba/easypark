import styles from "./styles.module.css"
import report_icon from "../../assets/report.jpg"
import report_structure from "./report_structure.json"

import { useContext, useEffect, useState, useRef } from "react"
import SideContext from '../../Context'
import getCurrentTime from "./currentTime"

import Icon from "@mdi/react";
import { mdiPencilOutline, mdiFileDocumentOutline, mdiDownloadBoxOutline, mdiEmailOutline } from "@mdi/js";

export default function Reports() {

    const { updateActive } = useContext(SideContext);

    const [type, setType] = useState("");
    const [filter, setFilter] = useState(null);
    const [titles, setTitles] = useState([]);
    const [display, setDisplay] = useState(null);
    const [details, setDetails] = useState(null);
    const [filtered, setFiltered] = useState([]);

    const filterRef = useRef(null);
    const inputRef = useRef(null);
    const resultsRef = useRef(null);

    // handling search and filter

    const handleInput = (e) => {
        let req = e.target.value.toLowerCase();
        setFilter(req);
    }

    useEffect(() => {
        let res = titles.filter((title) => title.value.toLowerCase().includes(filter));
        setFiltered([...res]);
        if (filterRef.current !== null && filter !== null) {
            if (filter.length !== 0) {
                filterRef.current.className = styles.focus;
                resultsRef.current.style.display = "block";
            } else {
                filterRef.current.className = styles.filter;
                resultsRef.current.style.display = "none";
            }
        }
    }, [filter])

    // handling select changes

    useEffect(() => {
        let result = [];
        switch (type) {
            case "parking_lots":
                result = [{ index: 1, value: "Occupancy Trends" }, { index: 2, value: "Revenue Analysis" }, { index: 3, value: "Time Analysis" }, { index: 4, value: "Maintenance Needs" }];
                break;
            case "sessions":
                result = [{ index: 1, value: "Usage Patterns" }, { index: 2, value: "Peak Usage Hours" }, { index: 3, value: "Session Duration" }, { index: 4, value: "Session Distribution" }];
                break;
            case "users":
                result = [{ index: 1, value: "User Activity" }, { index: 2, value: "Access Patterns" }, { index: 3, value: "User Engagement" }];
                break;
            case "sensors":
                result = [{ index: 1, value: "Health and Status" }, { index: 2, value: "Maintenance Requirements" }, { index: 4, value: "Alert History" }];
                break;
            case "all":
                result = [{ index: 1, value: "Occupancy Trends" }, { index: 2, value: "Revenue Analysis" }, { index: 3, value: "Time Analysis" }, { index: 4, value: "Maintenance Needs" }, { index: 5, value: "Usage Patterns" }, { index: 6, value: "Peak Usage Hours" }, { index: 7, value: "Session Duration" }, { index: 8, value: "Session Distribution" }, { index: 9, value: "User Activity" }, { index: 10, value: "Access Patterns" }, { index: 11, value: "User Engagement" }, { index: 12, value: "Health and Status" }, { index: 13, value: "Maintenance Requirements" }, { index: 14, value: "Alert History" }];
                break;
        }
        setTitles(result);
        setDisplay(null);
        setDetails(null);
    }, [type])

    useEffect(() => {
        setDetails(report_structure.reports[type]);
    }, [type, display])

    useEffect(() => {
        updateActive(6);
        setType("all");
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
                <div ref={filterRef} className={styles.filter}>
                    <input autoFocus ref={inputRef} type="text" name="filter" id="filter" placeholder="Filter by params" onChange={(e) => handleInput(e)} />
                    <div ref={resultsRef} className={styles.results}>
                        {
                            filtered !== null
                                ? (
                                    filtered.map((item, index) => {
                                        return (
                                            <div key={index} className={styles.result} onClick={() => { 
                                                filterRef.current.className = styles.filter;
                                                resultsRef.current.style.display = "none";
                                                setDisplay({ id: item.index, value: item.value })
                                            }
                                                }>
                                                <p className={styles.text}>{item.value}</p>
                                            </div>
                                        )
                                    })
                                ) : null
                        }
                    </div>
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
                                    <li key={index} className={display !== null && title.value === display.value ? styles.display : styles.title} onClick={() => setDisplay({ id: title.index, value: title.value })}>
                                        <p>{title.index}</p>
                                        <p>{title.value}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.format}>
                    {
                        display === null || details === null
                            ? (
                                <div className={styles.noDisplay}>
                                    <img src={report_icon} alt="" />
                                    <p className={styles.help}>
                                        Select a report from the menu on the right!
                                    </p>
                                </div>
                            )
                            : (
                                <>
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
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
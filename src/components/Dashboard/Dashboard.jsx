import { useState, useEffect } from "react";
import SessionsChart from "./sessionsChart";

import styles from "./styles.module.css";
import BeatLoader from "react-spinners/BeatLoader"

import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccountMultiple, mdiSmokeDetectorVariant, mdiCash, mdiPercentBoxOutline, mdiAvTimer, mdiParking, mdiHelpCircleOutline, mdiMenuUp, mdiMapMarkerOutline, mdiChevronDoubleRight } from "@mdi/js";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState("0");
    const [sensors, setSensors] = useState("0");
    const [income, setIncome] = useState("0");
    const [occupancy, setOccupancy] = useState(0);
    const [sessionData, setSessionData] = useState({});
    const [parkingLots, setParkingLots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/dashboard/');
                const data = await response.json();
                setUsers(data.no_users);
                setSensors(data.no_sensors);
                setIncome(data.expected_income);
                setOccupancy(data.total_occupancy);
                setSessionData(data.session_data);
                setParkingLots(data.parking_lots);
            } catch (error) {
                console.error("Error fetching data");
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
    } else {
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
                            {users}
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
                            {sensors}
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
                            {income}
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
                            {occupancy}%
                        </p>
                        <meter className={styles.perc_occu} value={occupancy} min="0" max="100" low="25" high="60" optimum="100" />
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
                        <SessionsChart data={sessionData} />
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
                        <div className={styles.table}>
                            <div className={styles.header}>
                                <ul className={styles.titles}>
                                    <li className={styles.title}>
                                        Location
                                    </li>
                                    <li className={styles.title}>
                                        Income (UGX)
                                    </li>
                                    <li className={styles.title}>
                                        Occupancy Rate
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.body}>
                                {
                                    parkingLots.map((lot, index) => {
                                        return (
                                            <ul key={index} className={styles.parking_lot}>
                                                <li className={styles.location}>{lot.name}</li>
                                                <li className={styles.value}>{lot.income}</li>
                                                <li className={styles.rate}>
                                                    <p className={styles.val}>{lot.occupancy}%</p>
                                                    <meter className={styles.rate} value={lot.occupancy} min="0" max="100" low="25" high="60" optimum="100" />
                                                </li>
                                                <Link to="parking_lot/uuid" className={styles.lot}>
                                                    <Icon path={mdiChevronDoubleRight} size={1} />
                                                </Link>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
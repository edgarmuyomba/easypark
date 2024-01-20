import styles from "./styles.module.css"

import { useContext, useEffect, useState, useRef } from "react"
import BeatLoader from "react-spinners/BeatLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

import SideContext from "../../Context";
import baseUrl from "../../serverUrl";

import Icon from "@mdi/react";
import { mdiPen, mdiTrashCanOutline } from "@mdi/js";
import sensorIcon from "../../assets/sensor-icon.png"
import ToggleSwitch from "../Toggleswitch/ToggleSwitch";

export default function Sensors() {

    const { updateActive } = useContext(SideContext);

    const [loading, setLoading] = useState(true);
    const [sensors, setSensors] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState({ number: 1, page_size: 33 });
    const [sideOpen, setSideOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [id, setId] = useState(-1);

    const sideRef = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/sensors/?page=${page.number}&page_size=${page.page_size}`);
            const data = await response.json();
            setSensors(data.results);
            setupPages(data.count);
        } catch (error) {
            console.log("Error fetching sensors", error);
        } finally {
            setLoading(false);
        }
    }

    const setupPages = (count) => {
        let result = [];
        let _full = Math.floor(count / 33), _half = count / 33;
        _full = _full + Math.ceil(_half - _full);
        for (let i = 1; i <= _full; i++) {
            result.push({
                number: i,
                page_size: 33,
            })
        }
        setPages(result);
    }

    const changePage = (pg) => {
        setPage(pg);
    }

    useEffect(() => {
        fetchData();
        setSideOpen(false);
    }, [page])

    useEffect(() => {

        updateActive(5);

        fetchData();

    }, []);

    const handleDelete = async (uuid) => {
        // sensor click handler is getting in the way
        const options = {
            method: "DELETE"
        };

        try {
            const response = await fetch(`${baseUrl}/delete_sensor/${uuid}/`, options);
            const data = await response.json()
            console.log(data);
            if (response.status === 200) {
                // display success
                let tmp = sensors.filter((sensor) => sensor.uuid !== uuid);
                setSensors([...tmp]);
            } else {
                // display error
            }
        } catch (error) {
            // display failure
        }
    }

    function toggleSide(sensor) {
        if (sideOpen && id !== sensor.id) {
            fetchDetails(sensor);
            setId(sensor.id);
        } else if (sideOpen && id === sensor.id) {
            setSideOpen(false);
            sideRef.current.className = styles.slideOut;
            sideRef.current.style.right = "-300px";
        } else if (!sideOpen) {
            setSideOpen(true);
            setId(sensor.id);
            sideRef.current.className = styles.slideIn;
            sideRef.current.style.right = "0";
            fetchDetails(sensor);
        }
    }

    async function fetchDetails(sensor) {
        let result = {};

        try {
            const response = await fetch(`${baseUrl}/parking_lot_details/${sensor.parking_lot}/`);
            const data = await response.json();

            result.name = data.name;
            for (let slot of data.slots) {
                if (slot.uuid === sensor.slot) {
                    result.slot = slot.slot_number;
                    result.occupied = slot.occupied;
                }
            }
        } catch (error) {
            console.log("Failed to fetch sensor details", error);
        } finally {
            setDetails({ ...result });
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
            <div className={sideOpen ? styles.tabOpen : styles.container}>
                <div className={styles.sensors}>
                    {
                        sensors.map((sense, index) => {
                            return (
                                <div key={index} className={styles.sensor}>
                                    <div className={styles.icon}>
                                        <img src={sensorIcon} alt="" />
                                    </div>
                                    <p className={styles.id}>{sense.id}</p>
                                    <div className={styles.actions}>
                                        <div className={styles.edit} onClick={() => toggleSide(sense)}>
                                            <Icon path={mdiPen} size={0.65} />
                                        </div>
                                        <div className={styles.delete} onClick={() => handleDelete(sense.uuid)}>
                                            <Icon path={mdiTrashCanOutline} size={0.65} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    sideOpen
                        ? null
                        : (
                            <div className={styles.pageContainer}>
                                <div className={styles.pagination}>
                                    {
                                        pages.map((_page, index) => {
                                            return (
                                                <div key={index} className={index + 1 === page.number ? styles.activePage : styles.page} onClick={() => {
                                                    index + 1 === page.number
                                                        ? null
                                                        : changePage(_page);
                                                }}>
                                                    {_page.number}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                }
                <aside className={styles.side} ref={sideRef}>
                    {
                        !details
                            ? (
                                <div className={styles.loading}>
                                    <ScaleLoader
                                        color="whitesmoke"
                                        loading={!details}
                                        cssOverride={{
                                            width: "1.5rem"
                                        }}
                                    />
                                </div>
                            )
                            : (
                                <>
                                    <div className={styles.lot}>{details.name}</div>
                                    <div className={styles.slotNo}>{details.slot}</div>
                                    <div className={styles.occupied}>
                                        {/* mark the slot as occupied or not */}
                                        <div className={details.occupied ? styles.taken : styles.status}>
                                            <p className={styles.value}>
                                                {
                                                    details.occupied
                                                        ? "Occupied"
                                                        : "Free"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                    }
                </aside>
            </div>
        )
    }
}
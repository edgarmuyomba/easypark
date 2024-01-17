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
    const [sideOpen, setSideOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [id, setId] = useState(-1);

    const sideRef = useRef(null);

    useEffect(() => {

        updateActive(5);

        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/sensors/`);
                const data = await response.json();
                setSensors(data);
            } catch (error) {
                console.log("Error fetching sensors", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, []);

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
                                <div key={index} className={styles.sensor} onClick={() => toggleSide(sense)}>
                                    <div className={styles.icon}>
                                        <img src={sensorIcon} alt="" />
                                    </div>
                                    <p className={styles.id}>{sense.id}</p>
                                    <div className={styles.actions}>
                                        <div className={styles.edit}>
                                            <Icon path={mdiPen} size={0.65} />
                                        </div>
                                        <div className={styles.delete}>
                                            <Icon path={mdiTrashCanOutline} size={0.65} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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
                                        <ToggleSwitch
                                            checked={details.occupied === true}
                                        />
                                        <p className={styles.text}>Slot is occupied</p>
                                    </div>
                                </>
                            )
                    }
                </aside>
            </div>
        )
    }
}
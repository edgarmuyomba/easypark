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
    const [details, setDetails] = useState(true);

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

    function toggleSide() {
        const _class = sideRef.current.className;
        if (_class === styles.side || _class === styles.slideOut) {
            sideRef.current.className = styles.slideIn;
            sideRef.current.style.right = "0";
        } else {
            sideRef.current.className = styles.slideOut;
            sideRef.current.style.right = "-300px";
        }
        setSideOpen((prev) => !prev);
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
                                <div key={index} className={styles.sensor} onClick={() => toggleSide()}>
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
                {
                    // sideOpen
                    //     ? (
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
                                        <div className={styles.lot}>Acacia Mall</div>
                                        <div className={styles.slotNo}>LV_22</div>
                                        <div className={styles.occupied}>
                                            {/* mark the slot as occupied or not */}
                                            <ToggleSwitch />
                                            <p className={styles.text}>Slot is occupied</p>
                                        </div>
                                    </>
                                )
                        }
                    </aside>
                    // )
                    // : null
                }
            </div>
        )
    }
}
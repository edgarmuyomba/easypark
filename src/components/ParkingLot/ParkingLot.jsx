import Navbar from "../Navbar/Navbar.jsx";

import styles from "./styles.module.css";
import Icon from "@mdi/react";
import { mdiSecurity, mdiCctv, mdiCarBrakeParking } from "@mdi/js";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader"

import handleSlotOptionClick from "./utils.js";

export default function ParkingLot() {
    const { uuid } = useParams();

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});
    const [levels, setLevels] = useState([]);
    const [slots, setSlots] = useState([]);

    const responseRef = useRef(null);
    const [response, setResponse] = useState('This is a response');
    const [respstyles, setRespstyles] = useState({ backgroundColor: 'rgb(131, 255, 131)', color: 'rgb(0, 58, 0)', border: 'none' });

    const optionsRef = useRef(null);
    const lotsRef = useRef(null);

    function processLevels(number, slots) {
        let results = [];

        for (let i = 0; i < number; i++) {
            results.push([]);
        }
        for (let slot of slots) {
            results[slot.level - 1].push(slot)
        }
        return results;
    }

    function handleClick() {

    }

    function showOptions(e) {
        optionsRef.current.style.display = 'block';
        optionsRef.current.style.top = `${e.clientY}px`;
        optionsRef.current.style.left = `${e.clientX}px`;
    }

    (() => {
        document.onclick = (e) => {
            let x = e.clientX, y = e.clientY;
            let rect = lotsRef.current.getBoundingClientRect();
            
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                optionsRef.current.style.display = 'none';
            }
        }
    })();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/parking_lot_details/${uuid}/`);
                const data = await response.json();
                setDetails(data);
                const levels = processLevels(data.number_of_stories, data.slots);
                setLevels(levels);
                setSlots(data.slots);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [uuid, slots]);

    function serviceIcon(key) {
        switch (key) {
            case "Security":
                return (
                    <div className={styles.icon} style={{ backgroundColor: 'lightskyblue' }}>
                        <Icon path={mdiSecurity} size={0.8} color="rgb(0, 42, 61)" />
                    </div>
                )
            case "CCTV":
                return (
                    <div className={styles.icon} style={{ backgroundColor: 'lightgreen' }}>
                        <Icon path={mdiCctv} size={0.8} color="darkgreen" />
                    </div>
                )
            case "Valet Parking":
                return (
                    <div className={styles.icon} style={{ backgroundColor: 'lightsalmon' }}>
                        <Icon path={mdiCarBrakeParking} size={0.8} color="red" />
                    </div>
                )
        }
    }


    return (
        <div className={styles.parkingLotDetails}>
            <Navbar />
            <div className={styles.response} style={respstyles} ref={responseRef}>
                <p className={styles.text}>{response}</p>
            </div>
            {
                loading
                    ? (
                        <div className={styles.loading}>
                            <BeatLoader
                                color="rgb(21, 31, 44)"
                                loading={loading}
                                size={10}
                            />
                        </div>
                    )
                    : (
                        <>
                            <div className={styles.lots} ref={lotsRef}>
                                <div className={styles.options} ref={optionsRef}>
                                    <ul className={styles.list}>
                                        <li className={styles.option}>
                                            <p className={styles.text}>Park</p>
                                        </li>
                                        <li className={styles.option}>
                                            <p className={styles.text}>Release</p>
                                        </li>
                                        <li className={styles.option}>
                                            <p className={styles.text}>Edit</p>
                                        </li>
                                        <li className={styles.option}>
                                            <p className={styles.text}>Modify</p>
                                        </li>
                                    </ul>
                                </div>
                                {
                                    levels.map((level, index) => {
                                        return (
                                            <section key={index} className={styles.lot}>
                                                <p className={styles.lotNumber}>{`Level ${index + 1}`}</p>
                                                <div className={styles.slots}>
                                                    {
                                                        level.map((slot, index) => {
                                                            return (
                                                                <div key={index} className={slot.occupied ? styles.slotOccupied : styles.slot} onClick={(e) => showOptions(e)}>
                                                                    <p className={styles.label} style={{ color: slot.occupied ? 'white' : 'rgb(58, 58, 58)' }}>
                                                                        {slot.slot_number}
                                                                    </p>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </section>
                                        );
                                    })
                                }
                            </div>
                            <aside className={styles.details}>
                                <img className={styles.banner} src={details.image} alt="parking_lot_banner" />
                                <p className={styles.name}>{details.name}</p>
                                <div className={styles.time}>
                                    <p className={styles.value}>{details.open} - {details.close}</p>
                                    <p className={styles.caption}>Operating Hours</p>
                                </div>
                                <div className={styles.slotDetails}>
                                    <div className={styles.noStories}>
                                        <p className={styles.value}>{details.number_of_stories}</p>
                                        <p className={styles.caption}>Number of Stories</p>
                                    </div>
                                    <div className={styles.occupancy}>
                                        <p className={styles.occupancy}>{details.occupancy}</p>
                                        <p className={styles.caption}>Occupancy</p>
                                    </div>
                                </div>
                                <div className={styles.servicesProvided}>
                                    <p className={styles.title}>Services Provided</p>
                                    <ul className={styles.services}>
                                        {
                                            details.services_provided.map((service, index) => {
                                                return (
                                                    <li key={index} className={styles.service}>
                                                        {serviceIcon(service)}
                                                        <p className={styles.name}>{service}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </aside>
                        </>
                    )
            }
        </div>
    )
}
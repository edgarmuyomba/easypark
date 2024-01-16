import Navbar from "../Navbar/Navbar.jsx";

import styles from "./styles.module.css";
import Icon from "@mdi/react";
import { mdiSecurity, mdiCctv, mdiCarBrakeParking, mdiTrashCanOutline, mdiPencilOutline } from "@mdi/js";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader"

import handleSlotOptionClick from "./optionUtils.js";

export default function ParkingLot() {
    const { uuid } = useParams();

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});
    const [number, setNumber] = useState(0);
    const [levels, setLevels] = useState([]);
    const [slots, setSlots] = useState([]);
    const [option, setOption] = useState(null);

    const responseRef = useRef(null);
    const [response, setResponse] = useState('This is a response');
    const [respstyles, setRespstyles] = useState({ backgroundColor: 'rgb(131, 255, 131)', color: 'rgb(0, 58, 0)', border: 'none' });

    const lotsRef = useRef(null);

    function processLevels(number, slots) {
        // organizing the slots in terms of levels
        let results = [];

        for (let i = 0; i < number; i++) {
            results.push([]);
        }
        for (let slot of slots) {
            results[slot.level - 1].push(slot)
        }
        return results;
    }

    async function handleClick(slot, action) {
        // option tab click
        let tmp = slots;
        const result = await handleSlotOptionClick(slot, tmp, action);
        setSlots(result.slots);
        const _levels = processLevels(number, result.slots);
        setLevels(_levels);
        handleMessage(result.message, result.styles);
    }

    function handleMessage(message, _styles) {
        // displaying an action response
        setResponse(message);
        _styles === null
            ? null
            : setRespstyles(_styles);

        responseRef.current.className = styles.slideIn;
        responseRef.current.style.top = "0";
        setTimeout(() => {
            responseRef.current.className = styles.slideOut;
            responseRef.current.style.top = "-80px";
        }, 3000);
    }

    (() => {
        // hiding the option block
        lotsRef.current !== null
            ?
            document.onclick = (e) => {
                let x = e.clientX, y = e.clientY;
                let rect = lotsRef.current.getBoundingClientRect();
                if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) setOption(null);
            }
            : null
    })();

    useEffect(() => {
        const fetchData = async () => {
            // fetching information details about the lot
            try {
                const response = await fetch(`http://localhost:8000/parking_lot_details/${uuid}/`);
                const data = await response.json();
                setDetails(data);
                setNumber(data.number_of_stories);
                const _levels = processLevels(data.number_of_stories, data.slots);
                setLevels(_levels);
                setSlots(data.slots);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [uuid]);

    function serviceIcon(key) {
        // icon management for services
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
                                {
                                    levels.map((level, index) => {
                                        return (
                                            <section key={index} className={styles.lot}>
                                                <p className={styles.lotNumber}>{`Level ${index + 1}`}</p>
                                                <div className={styles.slots}>
                                                    {
                                                        level.map((slot, index) => {
                                                            return (
                                                                <div key={index} className={slot.occupied ? styles.slotOccupied : styles.slot} onClick={() => {
                                                                    if (option === index) setOption(null);
                                                                    else setOption(index)
                                                                }}>
                                                                    <p className={styles.label} style={{ color: slot.occupied ? 'white' : 'rgb(58, 58, 58)' }}>
                                                                        {slot.slot_number}
                                                                    </p>
                                                                    <div className={option === index ? styles.view : styles.options}>
                                                                        <ul className={styles.list}>
                                                                            <li className={styles.option} onClick={() => {
                                                                                slot.occupied
                                                                                    ? null
                                                                                    : handleClick(slot, "park")
                                                                            }}>
                                                                                <p className={styles.text}>Park</p>
                                                                            </li>
                                                                            <li className={styles.option} onClick={() => {
                                                                                slot.occupied
                                                                                    ? handleClick(slot, "release")
                                                                                    : null
                                                                            }}>
                                                                                <p className={styles.text}>Release</p>
                                                                            </li>
                                                                            {/* <li className={styles.option}>
                                                                                <p className={styles.text}>Edit</p>
                                                                            </li>  still figuring out edit block style options */}
                                                                            <li className={styles.option} onClick={() => {
                                                                                handleClick(slot, "destroy")
                                                                            }}>
                                                                                <p className={styles.text}>Delete</p>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
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
                                <p className={styles.name}>
                                    {details.name}
                                    <Icon className={styles.edit} path={mdiPencilOutline} size={0.5} color="grey" />
                                </p>
                                <div className={styles.time}>
                                    <p className={styles.value}>
                                        {details.open} - {details.close}
                                        <Icon className={styles.edit} path={mdiPencilOutline} size={0.5} color="grey" />
                                    </p>
                                    <p className={styles.caption}>Operating Hours</p>
                                </div>
                                <div className={styles.slotDetails}>
                                    <div className={styles.noStories}>
                                        <p className={styles.value}>
                                            {details.number_of_stories}
                                            <Icon className={styles.edit} path={mdiPencilOutline} size={0.5} color="grey" />
                                        </p>
                                        <p className={styles.caption}>Number of Stories</p>
                                    </div>
                                    <div className={styles.occupancy}>
                                        <p className={styles.occupancy}>
                                            {details.occupancy}
                                            <Icon className={styles.edit} path={mdiPencilOutline} size={0.5} color="grey" />
                                        </p>
                                        <p className={styles.caption}>Occupancy</p>
                                    </div>
                                </div>
                                <div className={styles.servicesProvided}>
                                    <p className={styles.title}>
                                        Services Provided
                                        <Icon className={styles.edit} path={mdiPencilOutline} size={0.5} color="grey" />
                                    </p>
                                    <ul className={styles.services}>
                                        {
                                            details.services_provided.map((service, index) => {
                                                return (
                                                    <li key={index} className={styles.service}>
                                                        {serviceIcon(service)}
                                                        <p className={styles.name}>{service}</p>
                                                        <Icon className={styles.deleteService} path={mdiTrashCanOutline} size={1} color="rgb(255, 97, 57)" />
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
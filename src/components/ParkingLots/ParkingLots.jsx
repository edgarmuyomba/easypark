// display parking lots and delete
import { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";

import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import SideContext from "../../Context";

import baseUrl from "../../serverUrl";

export default function ParkingLots() {

    const { updateActive } = useContext(SideContext);

    const [loading, setLoading] = useState(true);
    const [lots, setLots] = useState([]);

    useEffect(() => {
        updateActive(2);

        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/parking_lots/`);
                const data = await response.json();
                setLots(data);
            } catch (error) {
                console.log("Failed to fetch parking lots");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

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
            <div className={styles.parkinglots}>
                <div className={styles.new}>
                    <button className={styles.addLot}>
                        New Lot
                    </button>
                </div>
                {/* <div className={styles.registerCont}>
                    <div className={styles.registerLot}>
                        <p className={styles.header}>Register a new parking lot</p>
                        <div className={styles.form}>
                            <form action="" method="POST" encType="multipart/form-data">
                                <div className={styles.input}>
                                    <label htmlFor="image">Image</label>
                                    <input required type="file" id="image" placeholder="Image" />
                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="name">Name</label>
                                    <input required type="text" id="name" placeholder="Name" />
                                </div>
                                <div className={styles.coords}>
                                    <p className={styles.title}>Location</p>
                                    <label htmlFor="lat">Latitude</label>
                                    <input required type="number" id="lat" placeholder="Latititude" />
                                    <label htmlFor="lon">Longitude</label>
                                    <input required type="number" id="lon" placeholder="Longitude" />
                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="rate">Rate</label>
                                    <input required type="number" id="rate" placeholder="Rate Per Hour" />
                                </div>
                                <div className={styles.time}>
                                    <p className={styles.title}>Opening and Closing time</p>
                                    <label htmlFor="open">Open</label>
                                    <input required type="time" id="open" placeholder="Open" />
                                    <label htmlFor="close">Close</label>
                                    <input required type="time" id="close" placeholder="Close" />
                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="noStories">Stories</label>
                                    <input required type="number" id="noStories" placeholder="Number of Stories" />
                                </div>
                                <div className={styles.input}>
                                    <label htmlFor="services">Services</label>
                                    <input required type="text" id="services" placeholder="Services Provided" />
                                </div>
                                <input className={styles.submit} type="submit" value="Create Lot" />
                            </form>
                        </div>
                    </div>
                </div> */}
                {
                    lots.map((lot, index) => {
                        return (
                            <Link className={styles.lot} key={index} to={`/parking_lot/${lot.uuid}/`}>
                                    <div className={styles.image} style={{ backgroundImage: `url(${lot.image})`}}></div>
                                    <div className={styles.details}>
                                        <p className={styles.name}>{lot.name}</p>
                                        <p className={styles.time}>{`${lot.open}`.split(':')[0]}am - {`${lot.close}`.split(':')[0]}pm</p>
                                        <p className={styles.occupancy}>{lot.occupancy}</p>
                                    </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}
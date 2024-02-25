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
                {
                    lots.map((lot, index) => {
                        return (
                            <Link className={styles.lot} key={index} to={`/parking_lot/${lot.uuid}/`}>
                                    <div className={styles.image} style={{ backgroundImage: `url(${baseUrl}${lot.image})`}}></div>
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
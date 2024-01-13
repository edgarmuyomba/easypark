import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import profile from '../../assets/profile.jpg'
import Icon from '@mdi/react'
import { mdiBellBadgeOutline } from '@mdi/js'

import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link to="/">
                <div className={styles.logo}>
                    <img src={logo} id={styles.logo} alt="easy_park" />
                </div>
                <p className={styles.name}>
                    Easy Park
                </p>
            </Link>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <Icon path={mdiBellBadgeOutline} size={1} title="Notifications" color="rgb(85, 85, 85)" />
                </li>
                <li className={styles.link}>
                    <div className={styles.profile}>
                        <img src={profile} id={styles.profile} alt="profile" />
                    </div>
                </li>
            </ul>
        </div>
    )
}
'use client'
//libs
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
//styles
import styles from './styles.module.scss'
//images
import logo from '../../../public/assets/icons/logo.svg'




const SideBar = () => {
    const path = usePathname();

    return (
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                <Image src={logo} alt={"Logo"}/>
            </div>
            <nav className={styles.navigation}>
                <Link href={"/"} className={`${styles.navLink} ${styles.activeNavLink}`}>
                    <svg className={styles.navIcon} width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.52941 0.5H18V6.85294H9.52941V0.5ZM9.52941 18.5V7.91177H18V18.5H9.52941ZM0 18.5V12.1471H8.47059V18.5H0ZM0 11.0882V0.5H8.47059V11.0882H0ZM1.05882 1.55882V10.0294H7.41177V1.55882H1.05882ZM10.5882 1.55882V5.79412H16.9412V1.55882H10.5882ZM10.5882 8.97059V17.4412H16.9412V8.97059H10.5882ZM1.05882 13.2059V17.4412H7.41177V13.2059H1.05882Z" fill={path==="/" ? "#2366B5" : "#FFFFFF"}/>
                    </svg>
                    Overview
                </Link>
            </nav>
        </div>
    );
};

export default SideBar;

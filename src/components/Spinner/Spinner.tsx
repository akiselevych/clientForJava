//libs
import React from 'react';
import Image from "next/image";
//styles
import styles from './styles.module.scss'
//images
import spinner from '../../../public/assets/icons/spinner.svg';
const Spinner = () => {
    return (
        <Image src={spinner} alt={"Spinner"} className={styles.spiner}/>
    );
};

export default Spinner;

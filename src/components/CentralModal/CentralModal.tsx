import React, {ReactNode} from 'react';
//styles
import styles from './styles.module.scss'

const CentralModal = ({children}: {children: ReactNode}) => {
    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.container}>{children}</div>
        </>

    );
};

export default CentralModal;

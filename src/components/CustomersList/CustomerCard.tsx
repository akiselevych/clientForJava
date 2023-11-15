"use client"
//libs
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//images
import deleteIcon from "../../../public/assets/icons/delete.svg";
import options from "../../../public/assets/icons/options.svg";
//types
import {Currency, Customer} from "@/types";
//redux
import {useAppDispatch} from "@/hooks/hooks";
import {deleteCustomer, fetchOneCustomer} from "@/redux/slices/Customers.slice";
//components
import CentralModal from "@/components/CentralModal/CentralModal";
import {createAccount, deleteAccount} from "@/redux/slices/Accounts.slice";

const CustomerCard = ({customer}:{customer: Customer}) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const optionRef = useRef<HTMLDivElement>(null);
    const optionModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionRef.current && !optionRef.current.contains(event.target as Node) && optionModalRef.current && !optionModalRef.current.contains(event.target as Node)) {
                setIsOptionsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [setIsOptionsOpen]);

    const handleAddAccount = (currency : Currency) => {
        dispatch(createAccount({id: customer.id, currency: currency}));
    }

    return (
        <div className={styles.customer}>
            <p className={styles.field}>{customer.id}</p>
            <p className={styles.field}>{customer.name} {customer.surname}</p>
            <p className={styles.field}>{customer.email}</p>
            <p className={styles.field}>{customer.age}</p>
            <div className={styles.accounts}>
                {customer.accounts.length ? customer.accounts.map(acc => (
                    <div className={styles.account} key={acc.accountNumber}>
                        <div className={`${styles.field} ${styles.accountHeader}`}>
                            ID: {acc.id}
                            <Image
                                src={deleteIcon} alt={"Delete"}
                                className={styles.deleteIcon}
                                onClick={() => dispatch(deleteAccount({accountId: acc.id, customerId: acc.customerId}))}
                            />
                        </div>
                        <p className={styles.field}>№: {acc.accountNumber}</p>
                        <p className={styles.field}>Currency: {acc.currency}</p>
                    </div>
                )) : <p className={styles.field}>&quot;ZERO ACCOUNTS&quot;</p>}

            </div>
            <div className={styles.optionsWrapper} onClick={() => setIsOptionsOpen(true)} ref={optionRef}>
                <Image src={options} alt={"options"} className={styles.optionsIcon}/>
            </div>
            {isOptionsOpen && <div className={styles.options} ref={optionModalRef}>
                <div className={styles.option} onClick={() => setIsCurrencyOpen(true)}>Add account</div>
                <div className={styles.option} onClick={() => {
                    dispatch(fetchOneCustomer(customer.id));
                    setIsOptionsOpen(false)
                }}>Edit</div>
                <div className={styles.option} onClick={() => {
                    dispatch(deleteCustomer(customer.id));
                    setIsOptionsOpen(false)
                }}>Delete</div>
                {isCurrencyOpen &&
                    <CentralModal>
                        <h4 style={{fontSize: "18px", fontWeight: "bold"}}>Please pick a currency for new account</h4>
                        <div className={styles.currencies}>
                            <div onClick={() => {
                                handleAddAccount(Currency.USD)
                                setIsCurrencyOpen(false);
                                setIsOptionsOpen(false);
                            }} className={`${global.primaryButton} ${styles.currency}`}>USD</div>
                            <div onClick={() => {
                                handleAddAccount(Currency.EUR)
                                setIsCurrencyOpen(false);
                                setIsOptionsOpen(false);
                            }} className={`${global.primaryButton} ${styles.currency}`}>EUR</div>
                            <div onClick={() => {
                                handleAddAccount(Currency.UAH)
                                setIsCurrencyOpen(false);
                                setIsOptionsOpen(false);
                            }} className={`${global.primaryButton} ${styles.currency}`}>UAH</div>
                            <div onClick={() => {
                                handleAddAccount(Currency.CHF)
                                setIsCurrencyOpen(false);
                                setIsOptionsOpen(false);
                            }} className={`${global.primaryButton} ${styles.currency}`}>CHF</div>
                            <div onClick={() => {
                                handleAddAccount(Currency.GPB)
                                setIsCurrencyOpen(false);
                                setIsOptionsOpen(false);
                            }} className={`${global.primaryButton} ${styles.currency}`}>GPB</div>
                        </div>
                    </CentralModal>
                }
            </div>}
        </div>
    );
};

export default CustomerCard;

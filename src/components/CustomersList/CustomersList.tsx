"use client"
//libs
import React, {useEffect} from 'react';
import Image from "next/image";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//utils
//images
import spinner from '../../../public/assets/icons/spinner.svg'
//redux
import deleteIcon from "../../../public/assets/icons/delete.svg"
import options from "../../../public/assets/icons/options.svg"
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {fetchAllCustomers} from "@/redux/slices/Customers.slice";
import CustomerCard from "@/components/CustomersList/CustomerCard";
const CustomersList = () => {
    const dispatch = useAppDispatch();
    const customers = useAppSelector(state => state.Customers.customers);
    const loadStatus = useAppSelector(state => state.Customers.loadCustomersStatus);
    useEffect(() => {
        if (!customers.length && loadStatus === "loading"){
            dispatch(fetchAllCustomers());
        }
    }, []);

    return (
        <section className={styles.container}>
            <h2 className={`${global.sectionTitle} ${styles.title}`}>Customers: found {customers.length} customers</h2>
            <div className={styles.list}>
                <div className={styles.header}>
                    <p className={styles.field}>ID:</p>
                    <p className={styles.field}>Name:</p>
                    <p className={styles.field}>Email:</p>
                    <p className={styles.field}>Age:</p>
                    <p className={styles.field}>Accounts:</p>
                </div>
                {loadStatus === "idle" && customers.map(customer => (
                    <CustomerCard customer={customer} key={customer.id}/>
                ))}
                {loadStatus === "loading" && <Image src={spinner} alt={"spinner"} className={styles.spinner}/>}
            </div>
        </section>
    );
};

export default CustomersList;

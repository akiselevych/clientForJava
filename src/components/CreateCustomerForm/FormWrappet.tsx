"use client"
import React, {useEffect, useState} from 'react';
//components
import CreateCustomerForm from "@/components/CreateCustomerForm/CreateCustomerForm";
import CentralModal from "@/components/CentralModal/CentralModal";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";

const FormWrapper = () => {
    const [isFormOpen,setIsFormOpen] = useState<boolean>(false);
    const currentCustomer = useAppSelector(state => state.Customers.currentCustomer);
    useEffect(() => {
        if (!!currentCustomer){
            setIsFormOpen(true);
        }
    }, [currentCustomer]);
    return (
        <>
            { isFormOpen &&
                <CentralModal>
                    <CreateCustomerForm setIsModalOpen={setIsFormOpen}/>
                </CentralModal>
            }
            <div onClick={() => setIsFormOpen(true)} className={`${styles.createBtn} ${global.primaryButton}`}>Create new customer</div>
        </>
    );
};

export default FormWrapper;

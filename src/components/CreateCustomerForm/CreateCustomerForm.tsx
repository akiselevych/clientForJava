"use client"
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//types
import {Customer} from "@/types";
//components
import Spinner from "@/components/Spinner/Spinner";
//services
import {API_URL} from "@/services/API";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {createCustomer, resetCurrentCustomer, updateCustomer} from "@/redux/slices/Customers.slice";


interface Props{
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
const CreateCustomerForm: FC<Props> = ({setIsModalOpen}) => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const customer = useAppSelector(state => state.Customers.currentCustomer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!!customer){
            setValue(`name`, customer.name);
            setValue(`surname`, customer.surname);
            setValue(`age`, customer.age);
            setValue(`email`, customer.email);
            setValue(`id`, customer.id);
        }
        //eslint-disable-next-line
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {isValid}
    } = useForm<Partial<Customer>>();
    const submit = (data: Partial<Customer>) => {
        console.log(data)
        setIsSending(true);
        if (!!customer){
            dispatch(updateCustomer(({ data: data as Customer })))
            dispatch(resetCurrentCustomer())
        } else {
            dispatch(createCustomer(data))
        }
        setIsSending(false);
        setIsModalOpen(false);
    }

    return (
        <div className={styles.container}>
            <h3 className={`${styles.title} ${global.sectionTitle}`}>Please, enter the new customer data :</h3>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <div className={styles.inputs}>
                    <div className={styles.inputWrapper}>
                        <label className={`${global.primaryLabel} ${styles.label}`}>Name</label>
                        <input
                            type="text" {...register(`name`, {required: true})}
                            className={`${global.primaryInput} ${styles.input}`}
                            placeholder={"Enter name"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={`${global.primaryLabel} ${styles.label}`}>Surname</label>
                        <input
                            type="text" {...register(`surname`, {required: true})}
                            className={`${global.primaryInput} ${styles.input}`}
                            placeholder={"Enter surname"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={`${global.primaryLabel} ${styles.label}`}>Email</label>
                        <input
                            type="email" {...register(`email`, {required: true})}
                            className={`${global.primaryInput} ${styles.input}`}
                            placeholder={"Enter email address"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={`${global.primaryLabel} ${styles.label}`}>Age</label>
                        <input
                            type="number" {...register(`age`, {required: true})}
                            className={`${global.primaryInput} ${styles.input}`}
                            placeholder={"Enter email address"}
                        />
                    </div>
                </div>

                <div className={styles.submitWrapper}>
                    {!isSending && <button disabled={!isValid} type={"submit"}
                             className={`${global.primaryButton} ${styles.btn}`}>{!!customer ? "Edit" : "Create"}</button>}
                    {isSending && <Spinner/>}
                </div>
            </form>
        </div>
    );
};

export default CreateCustomerForm;

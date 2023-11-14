import {store} from "@/redux/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RequestStatus = "idle" | "loading" | "error";


export type Customer = {
    id: number,
    name: string,
    surname: string,
    email: string,
    age: number,
    accounts: Account[],
}

export type Account = {
    id: number,
    accountNumber: number,
    currency: Currency,
    balance: number,
    customerId: number,
}

export enum Currency{
    USD,
    EUR,
    UAH,
    CHF,
    GPB
}
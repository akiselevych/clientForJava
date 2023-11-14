import {Account, Currency, RequestStatus} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "@/axios";
import {fetchOneCustomer} from "@/redux/slices/Customers.slice";


const initialState: {
    accounts: Account[],
    currentAccount: Account | null,
    loadOneAccountStatus: RequestStatus,
    loadAccountsStatus: RequestStatus,
    updateAccountStatus: RequestStatus
    createAccountStatus: RequestStatus
    deleteAccountStatus: RequestStatus
} = {
    accounts: [],
    currentAccount: null,
    loadOneAccountStatus: "loading",
    loadAccountsStatus: "loading",
    updateAccountStatus: "idle",
    createAccountStatus: "idle",
    deleteAccountStatus: "idle",
}


export const createAccount = createAsyncThunk(
    "Account/createAccount",
    async ({id, currency}:{id: number, currency:Currency}) => {
        const res = await instance.post(`/customers/${id}/accounts`, JSON.stringify(currency));
        return res.data;
    }
)

export const deleteAccount = createAsyncThunk(
    "Account/deleteAccount",
    async ({accountId,customerId}: {accountId: number,customerId: number}) => {
        const res = await instance.delete(`/customers/${customerId}/accounts/${accountId}`);
        return {accountId,customerId};
    }
)

const Accounts = createSlice(
    {
        name: "Accounts",
        initialState,
        reducers:{
            resetCurrentAccount: (state) => {
                state.currentAccount = null;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(createAccount.pending, (state) => {
                    state.createAccountStatus = "loading";
                })
                .addCase(createAccount.fulfilled, (state, {payload}) => {
                    state.createAccountStatus = "idle";
                })
                .addCase(createAccount.rejected, (state) => {
                    state.createAccountStatus = "error";
                })
                .addCase(deleteAccount.pending, (state) => {
                    state.deleteAccountStatus = "loading";
                })
                .addCase(deleteAccount.fulfilled, (state, {payload}) => {
                    state.deleteAccountStatus = "idle";
                })
                .addCase(deleteAccount.rejected, (state) => {
                    state.deleteAccountStatus = "error";
                })
        }
    }
)
const {reducer, actions} = Accounts
export const {resetCurrentAccount} = actions
export default reducer;

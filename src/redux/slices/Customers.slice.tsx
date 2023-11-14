import {Customer, RequestStatus} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "@/axios";
import {createAccount, deleteAccount} from "@/redux/slices/Accounts.slice";


const initialState: {
    customers: Customer[],
    currentCustomer: Customer | null,
    loadOneCustomerStatus: RequestStatus,
    loadCustomersStatus: RequestStatus,
    updateCustomerStatus: RequestStatus
    createCustomerStatus: RequestStatus
    deleteCustomerStatus: RequestStatus
} = {
    customers: [],
    currentCustomer: null,
    loadOneCustomerStatus: "loading",
    loadCustomersStatus: "loading",
    updateCustomerStatus: "idle",
    createCustomerStatus: "idle",
    deleteCustomerStatus: "idle",
}

export const fetchAllCustomers = createAsyncThunk(
    "Customers/fetchAllCustomers",
    async () => {
        const res = await instance.get("/customers");
        return res.data;
    }
)

export const fetchOneCustomer = createAsyncThunk(
    "Customers/fetchOneCustomer",
    async (id: number) => {
        const res = await instance.get(`/customers/${id}`);
        return res.data;
    }
)

export const createCustomer = createAsyncThunk(
    "Customers/createCustomer",
    async (data: Partial<Customer>) => {
        const res = await instance.post("/customers", JSON.stringify(data));
        return res.data;
    }
)
export const updateCustomer = createAsyncThunk(
    "Customers/updateCustomer",
    async ({data} : {data: Customer}) => {
        const res = await instance.put(`/customers`, JSON.stringify(data));
        return res.data;
    }
)

export const deleteCustomer = createAsyncThunk(
    "Customers/deleteCustomer",
    async (id: number) => {
        const res = await instance.delete(`/customers/${id}`);
        return id
    }
)

const Customers = createSlice(
    {
        name: "Customers",
        initialState,
        reducers:{
            resetCurrentCustomer: (state) => {
                state.currentCustomer = null;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllCustomers.pending, (state) => {
                    state.loadOneCustomerStatus = "loading";
                })
                .addCase(fetchAllCustomers.fulfilled, (state, {payload}) => {
                    state.loadCustomersStatus = "idle";
                    state.customers = payload;
                })
                .addCase(fetchAllCustomers.rejected, (state) => {
                    state.loadCustomersStatus = "error";
                })

                .addCase(fetchOneCustomer.pending, (state) => {
                    state.loadOneCustomerStatus = "loading";
                })
                .addCase(fetchOneCustomer.fulfilled, (state, {payload}) => {
                    state.loadOneCustomerStatus = "idle";
                    state.currentCustomer = payload;
                })
                .addCase(fetchOneCustomer.rejected, (state) => {
                    state.loadOneCustomerStatus = "error";
                })

                .addCase(createCustomer.pending, (state) => {
                    state.createCustomerStatus = "loading";
                })
                .addCase(createCustomer.fulfilled, (state, {payload}) => {
                    state.createCustomerStatus = "idle";
                    state.customers = [...state.customers, payload];
                })
                .addCase(createCustomer.rejected, (state) => {
                    state.createCustomerStatus = "error";
                })

                .addCase(updateCustomer.pending, (state) => {
                    state.updateCustomerStatus = "loading";
                })
                .addCase(updateCustomer.fulfilled, (state, {payload}) => {
                    state.updateCustomerStatus = "idle";
                    state.customers = state.customers.map(c => {
                        if (c.id === payload.id){
                            return payload;
                        }
                        return c;
                    });
                })
                .addCase(updateCustomer.rejected, (state) => {
                    state.updateCustomerStatus = "error";
                })

                .addCase(deleteCustomer.pending, (state) => {
                    state.deleteCustomerStatus = "loading";
                })
                .addCase(deleteCustomer.fulfilled, (state, {payload}) => {
                    state.deleteCustomerStatus = "idle";
                    state.customers = state.customers.filter(c => c.id !== payload);
                })
                .addCase(deleteCustomer.rejected, (state) => {
                    state.deleteCustomerStatus = "error";
                })

            //FROM ANOTHER SLICE
                .addCase(createAccount.fulfilled, (state, {payload}) => {
                    state.customers.find(c => c.id === payload.customerId)?.accounts.push(payload);
                })
                .addCase(deleteAccount.fulfilled, (state, {payload}) => {
                    //@ts-ignore
                    state.customers.find(c => c.id === payload.customerId).accounts = state.customers.find(c => c.id === payload.customerId)?.accounts.filter(acc => acc.id !== payload.accountId)
                })
        }
    }
)
const {reducer, actions} = Customers
export const {resetCurrentCustomer} = actions
export default reducer;

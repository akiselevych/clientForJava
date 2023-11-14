import {API_URL} from "@/services/API";

export async function getCustomers(){
    const res = await fetch(`${API_URL}/customers`);
    return res.json();
}
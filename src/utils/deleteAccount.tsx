
export function deleteAccount(customerId: number, accountId: number){
    fetch(`http://localhost:9000/customers/${customerId}/accounts/${accountId}`, {method: 'DELETE'});
}
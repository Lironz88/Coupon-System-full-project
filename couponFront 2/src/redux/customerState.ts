import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";

export class CustomerState {
    customer: CustomerModel[] = [];
}

export enum CustomerActionType {
    addCustomer = "addCustomer",
    deleteCustomer = "deleteCustomer",
    downloadCustomers = "downloadCustomers",
    updateCustomer = "updateCustomer",
    removeAllCustomers = "removeAllCustomers",
    downloadSingleCustomer = "downloadSingleCustomer",
    PurchaseCoupon = "PurchaseCoupon",
}

export interface CustomerAction {
    type: CustomerActionType,
    payload?: any;
}

export function addCustomer(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.addCustomer, payload: customer };
}

export function deleteCustomer(customerId: number): CustomerAction {
    return { type: CustomerActionType.deleteCustomer, payload: customerId };
}

export function downloadCustomers(customers: CustomerModel[]): CustomerAction {
    return { type: CustomerActionType.downloadCustomers, payload: customers };
}

export function updateCustomer(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.updateCustomer, payload: customer };
}

export function downloadSingleCustomer(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.downloadSingleCustomer, payload: customer };
}

export function PurchaseCoupon(coupon: CouponModel): CustomerAction {
    return { type: CustomerActionType.PurchaseCoupon, payload: coupon };
}

export function removeAllCustomers(): CustomerAction {
    return { type: CustomerActionType.removeAllCustomers };
}

export function CustomerReducer(currentState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState {
    const newState = { ...currentState };

    switch (action.type) {
        case CustomerActionType.addCustomer:
            newState.customer.push(action.payload);
            break;

        case CustomerActionType.updateCustomer:
            const index = newState.customer.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                newState.customer[index] = action.payload;
            }
            break;

        case CustomerActionType.downloadCustomers:
            newState.customer = action.payload;
            break;

        case CustomerActionType.deleteCustomer:
            newState.customer = newState.customer.filter(item => item.id !== action.payload);
            break;

        case CustomerActionType.downloadSingleCustomer:
            newState.customer = [action.payload];
            break;

        case CustomerActionType.removeAllCustomers:
            newState.customer = [];
            break;
    }
    return newState;
}

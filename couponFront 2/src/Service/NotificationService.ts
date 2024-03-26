import { Notyf } from "notyf";
import { isExpressionWithTypeArguments } from "typescript";

export enum SccMsg{
    LOGIN_APPROVED = "Welcome!",
    COMPANY_ADD = "Company added successfully",
    CUSTOMER_ADD = "Customer added sucsefully",
    COMPANY_DELETE = "Company deleted sucsefully",
    CUSTOMER_DELETE = "Customer deleted sucsefully",
    COMPANY_UPDATE = "Company updated sucsefully",
    CUSTOMER_UPDATE = "Customer updated sucsefully",
    COUPON_ADD= "Coupon added succefully"
}


export enum ErrMsg {
    NO_LOGIN = "You must log in first",
    NOT_AUTHORIZED = "You are not authorized to view this page"
}


class Notify {
    private notification = new Notyf({ duration: 4000, position: { x: "center", y: "top" } });

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);  
    }

    private extractMsg(err: any): string {
        if (typeof err === 'string') {
            return err;
        }
        if (typeof err?.response?.data === 'string') {
            return err.response.data; 
        }
        if (Array.isArray(err?.response?.data)) {
            return err?.response?.data[0];
        }
        if (typeof err?.message === 'string') {
            return err.message;
        }
        return "Something doesn't work right...";
    }
}

const notify = new Notify();

export default notify;



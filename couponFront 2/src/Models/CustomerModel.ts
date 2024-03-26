import { CouponModel } from "./CouponModel";
export interface CustomerModel {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    coupons?: CouponModel[];
}


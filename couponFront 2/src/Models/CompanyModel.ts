import { CouponModel } from "./CouponModel";

export interface CompanyModel {
     id?: number;
     name: string;
     email: string;
     password: string;
     coupons?:CouponModel[];
}

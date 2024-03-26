import "./GetCustomerCoupons.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import { CustomerModel } from "../../../Models/CustomerModel";
import { CouponModel } from "../../../Models/CouponModel";
import SingleCoupon from "../../AdminArea/SingleCoupon/SingleCoupon";
import Button from "@mui/material/Button";

function GetCustomerCoupons(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const defaultCustomer: CustomerModel = {
        id: undefined, 
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        coupons: [],
    };

    const [customer, setCustomer] = useState<CustomerModel>(defaultCustomer); 
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>([]);
    
    useEffect(() => {
        if (store.getState().AuthState.userType == "ADMIN") {
            const {customerId} = location.state as any;
            let singleCustomer = store.getState().customerState.customer.find(item => customerId == item.id);
            if (singleCustomer) {
                setCustomer(singleCustomer);
                setCustomerCoupons(singleCustomer.coupons || []);
            }
        } else if (store.getState().AuthState.userType == "CUSTOMER") {
            let singleCustomer = store.getState().customerState.customer[0];
            setCustomerCoupons(singleCustomer.coupons || []);
        }
    }, [location.state]);

    const goHome = () => {
        if (store.getState().AuthState.userType === "ADMIN") {
            navigate("/admin/getAllCustomers");
        }
        if (store.getState().AuthState.userType === "CUSTOMER") {
            navigate("/customer/customerMainPage");
        }
    }

    return (
        <div className="getCustomerCoupons">
            <h1>Customer Coupons</h1><hr/>
            {customerCoupons.map(item => <SingleCoupon key={item.id} coupon={item} />)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default GetCustomerCoupons;

//import "./GetCustomerCouponsByCategory.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { store } from "../../../redux/store";
import notify from "../../../Service/NotificationService";
import { ErrMsg } from "../../../Service/NotificationService";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { CouponModel } from "../../../Models/CouponModel"
import SingleCoupon from "../../AdminArea/SingleCoupon/SingleCoupon";
import { CategoryType } from "../../../Models/CategoryType";

function GetCustomerCouponsByCategory(): JSX.Element {
    const navigate = useNavigate();
    let singleCustomer = store.getState().customerState.customer[0];
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>(singleCustomer.coupons || []);
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (store.getState().AuthState.userType !== "CUSTOMER") {
            notify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
    }, []);

    const send = (myCategory: string) => {
        if (myCategory === "ALL") {
            setCategory(myCategory);
            setCustomerCoupons(singleCustomer.coupons || []);
        } else {
            setCategory(myCategory);
            let coupons = singleCustomer.coupons?.filter(item => item.category === myCategory) || [];
            setCustomerCoupons(coupons);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        send(event.target.value as string);
    };

    const goBack = () => {
        navigate("/customer/customerMainPage");
    };

    const categoryOptions = Object.values(CategoryType).filter(value => typeof value === 'string');

    return (
        <div className="getCustomerCouponsByCategory">
            <h1 style={{ textAlign: "center" }}>Customer Coupons By Category</h1><hr/>
            <FormControl fullWidth>
                <InputLabel id="myCategory">Category</InputLabel>
                <Select variant="filled" labelId="myCategory" value={category} label="Category" onChange={handleChange}>
                    {categoryOptions.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {customerCoupons.map(item => <SingleCoupon key={item.id} coupon={item} />)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default GetCustomerCouponsByCategory;
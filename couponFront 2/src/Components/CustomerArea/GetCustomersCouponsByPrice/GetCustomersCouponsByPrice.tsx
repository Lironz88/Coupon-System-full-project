import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import notify from "../../../Service/NotificationService";
import { ErrMsg } from "../../../Service/NotificationService";
import { Box, Button, Slider, Typography } from "@mui/material";
import { CouponModel } from "../../../Models/CouponModel";
import SingleCoupon from "../../AdminArea/SingleCoupon/SingleCoupon";
import "./GetCustomersCouponsByPrice.css";

function GetCustomerCouponsByPrice(): JSX.Element {
    const navigate = useNavigate();
    let singleCustomer = store.getState().customerState.customer[0];

    // Provide a default empty array if singleCustomer.coupons is undefined
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>(
        singleCustomer.coupons || []
    );  

    const [myMaxPrice, setPrice] = useState<number>();
    const maxPrice = () => {
        let price = 0;
        for (let i = 0; i < singleCustomer.coupons!.length; i++) {
            if (singleCustomer.coupons![i].price > price) {
                price = singleCustomer.coupons![i].price;
            }
        }
        return price;
    };

    const [value, setValue] = useState<number | string | Array<number | string>>(maxPrice());

    useEffect(() => {
        if (store.getState().AuthState.userType !== "CUSTOMER") {
            notify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        setPrice(maxPrice());
    }, []);

    const send = (maxPrice: number) => {
        let coupons = singleCustomer.coupons!.filter(
            (item) => item.price <= maxPrice
        );
        setCustomerCoupons(coupons);
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
        send(newValue as number);
        setValue(newValue as number);
    };

    const goHome = () => {
        navigate("/customer/customerMainPage");
    }

    return (
        <div className="getCustomerCouponsByMoney">
            <h1 style={{ textAlign: "center" }}>Customer Coupons By Price</h1>
            <hr />  
            <Typography id="input-slider" gutterBottom> Max Price : {value} </Typography>
            <Box textAlign={"center"} width="90%">
                <Slider
                    getAriaLabel={() => "maxPrice"}
                    value={typeof value === 'number' ? value : 0}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    max={maxPrice()}
                />
            </Box>  
            {customerCoupons.map(item => (<SingleCoupon key={item.id} coupon={item}/> ))}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>           
        </div>
    );
}

export default GetCustomerCouponsByPrice;

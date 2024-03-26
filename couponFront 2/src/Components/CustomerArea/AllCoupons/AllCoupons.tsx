import { useEffect, useState } from "react";
import { downloadCoupons } from "../../../redux/couponState";
import { store } from "../../../redux/store";
import jwtAxios from "../../../Service/jwtAxios";
import notify from "../../../Service/NotificationService";
import SingleCoupon from "../../AdminArea/SingleCoupon/SingleCoupon";
import "./AllCoupons.css";
import { CouponModel } from "../../../Models/CouponModel";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function MyMainPage(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const getUserType = store.getState().AuthState.userType;
    const navigate = useNavigate();

    useEffect(() => {
        let url = "";

        if (getUserType === "CUSTOMER") {
            url = "http://localhost:8080/Lirons/customer/coupons";
        } else {
            url = "http://localhost:8080/guest/coupons";
        }

        jwtAxios.get<CouponModel[]>(url)
            .then(response => {
                setCoupons(response.data);
                console.log(response.data);
                store.dispatch(downloadCoupons(response.data));
            })
            .catch(err => {
                notify.error("No coupons in database or failed to fetch");
            });
    }, [getUserType]); 

    const goHome = () => {
        if (store.getState().AuthState.userType === "CUSTOMER") {
            navigate("/customer/customerMainPage");
        }
        else {
            navigate("/Login");
        }
    }

    return (
        <div className="myMainPage">
            {coupons.map(item => <SingleCoupon key={item.id} coupon={item} />)}
            <br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default MyMainPage;
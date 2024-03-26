import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { store } from "../../../redux/store";
import globals from "../../../Service/globals";
import jwtAxios from "../../../Service/jwtAxios";
import notify, { SccMsg } from "../../../Service/NotificationService";
import { updateCustomer } from "../../../redux/customerState";
import "./SingleCoupon.css";

interface SingleCouponProps {
    coupon: CouponModel;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const navigate = useNavigate();

    const purchaseCoupon = () => {
        const couponId = props.coupon.id;
        jwtAxios.put(globals.urls.purchaseCoupon + couponId)
            .then((response) => {
                if (response.status < 300) {
                    notify.success(SccMsg.COUPON_ADD);

                    const updatedCoupons = store.getState().couponState.coupon.map(coupon =>
                        coupon.id === couponId ? { ...coupon, amount: coupon.amount - 1 } : coupon
                    );

                    const customers = store.getState().customerState.customer;
                    if (customers && customers.length > 0) {
                        const customer = customers[0];
                        const myCoupons = customer.coupons ? [...customer.coupons, props.coupon] : [props.coupon];
                        const updatedCustomer = { ...customer, coupons: myCoupons };
                        store.dispatch(updateCustomer(updatedCustomer));
                    }

                    navigate("/customer/customerMainPage");
                }
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.details || "An error occurred";
                notify.error(errorMessage);
            });
    };

    const getUpdateButton = () => {
        if (getUserType === "CUSTOMER") {
            const customer = store.getState().customerState.customer[0];
            if (customer && customer.coupons && !customer.coupons.some(item => item.id === props.coupon.id)) {
                return (
                    <Button variant="contained" onClick={purchaseCoupon}>
                        Buy
                    </Button>
                );
            }
        }
    };

    const getData = () => {
        return (
            <>
                <img className="Image" src={props.coupon.image} alt={props.coupon.title}></img>
                <h6><b>{props.coupon.description}</b></h6>
                <div className="Container2">
                    <b>Price: {props.coupon.price}</b>
                    <br />
                    {getUserType !== "CUSTOMER" && <><b>Amount: {props.coupon.amount}</b><br /></>}
                    <b>Category: {props.coupon.category}</b>
                    <br />
                    <b>Start Date: {props.coupon.startDate}</b>
                    <br />
                    <b className="Expire">Expires: {props.coupon.endDate}</b>
                    <br />
                </div>
                <br />
                {getUpdateButton()}
            </>
        );
    };
    const updateCoupon = () => {
        console.log("Coupon ID in SingleCoupon:", props.coupon.id);
        navigate("/Lirons/company/updateCoupon", { state: { coupon: props.coupon } });
    };

    return (
        <div className="singleCoupon CouponBox">
            <h3 className="Container" style={{ textAlign: "center" }}>{props.coupon.title}</h3>
            <hr />
            {getData()}
            {getUserType === "COMPANY" &&
                <Button color="warning" onClick={updateCoupon}>Edit Coupon</Button>
            }
        </div>
    );
}

export default SingleCoupon;

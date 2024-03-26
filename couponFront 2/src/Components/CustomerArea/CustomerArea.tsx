import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerArea.css";

function CustomerArea(): JSX.Element {
    const navigate = useNavigate();

    const showAllCustomersCoupons = ()=>{
        navigate("/Lirons/customer/getAllCustomersCoupons");
    }
    const showDetails = ()=>{
        navigate("/Lirons/customer/customerDetails");
    }
    const showCouponsByCategory = ()=>{
        navigate("/Lirons/customer/getCouponsByCategory/{category}");
    }
    const showCouponsByPrice = ()=>{
        navigate("/Lirons/customer/getCouponsByMaxPrice/{maxPrice}");
    }
    const showAllCoupons = ()=>{
        navigate("/guest/coupons");
    }

    const buttonStyle = {
        width: '330px', // Set a fixed width for all buttons
    };

    const allCouponsButtonStyle = {
        width: '330px', 
        backgroundColor: '#4caf50',
        color: '#fff', 
        '&:hover': {
            backgroundColor: '#388e3c', 
        },
    };
    
    return (
        <div className="CustomerArea">
                <br/><br/>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={showDetails}> Show me my details</Button>
                 <span> </span>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={showAllCustomersCoupons}> Show me my Coupons</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={showCouponsByCategory}> Show me coupons by its category</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={showCouponsByPrice}> Show me coupons by a Maximum Price</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" sx={allCouponsButtonStyle} onClick={showAllCoupons}> All The Coupons</Button>
        </div>
    );
}

export default CustomerArea;

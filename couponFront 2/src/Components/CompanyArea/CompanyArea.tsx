import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../redux/store";
import "./CompanyArea.css";

function CompanyArea(): JSX.Element {

    const navigate = useNavigate();
   
    const addCoupon = ()=>{
        navigate("/Lirons/company/addCoupon")
    }

    const showAllCoupons = ()=>{
        navigate("/Lirons/company/getAllCoupons")
    }

    const compDetails = ()=>{
        navigate("/Lirons/company/companyDetails")
    }

    const couponByCat = ()=>{
        navigate("/Lirons/company/getCouponsByCategory/{category}")
    }

    const couponByMaxPrice = ()=>{
        navigate("/Lirons/company/getCouponsByMaxPrice/{maxPrice}")
    }
    const buttonStyle = {
        width: '330px', // Set a fixed width for all buttons
    };
    
    return (
        <div className="CompanyArea">
            <br/><br/>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={addCoupon}> Add a coupon</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={showAllCoupons}> Show me the Coupons</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={compDetails}> Show me my details</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={couponByCat}> Show me coupons by its category</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={couponByMaxPrice}> Show me coupons by a Maximum Price</Button>
                <span> </span>
        </div>
    );
}

export default CompanyArea;

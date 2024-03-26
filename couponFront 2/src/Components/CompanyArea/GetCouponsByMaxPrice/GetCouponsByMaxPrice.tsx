import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import { Box, Button, Slider, Typography } from "@mui/material";
import notify, { ErrMsg } from "../../../Service/NotificationService";
import { CouponModel } from "../../../Models/CouponModel";
import SingleCoupon from "../../AdminArea/SingleCoupon/SingleCoupon";
import jwtAxios from "../../../Service/jwtAxios";


function GetCouponsByMaxPrice(): JSX.Element {
    const navigate = useNavigate();
    const [companyCoupons, setCompanyCoupons] = useState<CouponModel[]>([]);
    const [value, setValue] = useState<number>(100); // Initial max price

    const send = async (maxPrice: number) => {
        console.log("Fetching coupons with maxPrice:", maxPrice);
        try {
            const response = await jwtAxios.get<CouponModel[]>(`http://localhost:8080/Lirons/company/getCouponsByMaxPrice/${maxPrice}`);
            setCompanyCoupons(response.data);
        } catch (error) {
            console.error("Error fetching coupons by max price", error);
            notify.error("Error fetching coupons by max price");
        }
    };

    useEffect(() => {
        if (store.getState().AuthState.userType !== "COMPANY") {
            notify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
            return;
        }
        // Optionally, you can fetch initial coupons here or leave it to the slider change
    }, [navigate]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        const newMaxPrice = newValue as number;
        setValue(newMaxPrice);
        send(newMaxPrice); // Fetch coupons based on the new max price
    };

    const goBack = () => {
        navigate("/company/companyMainPage");
    };

    return (
        <div className="getCouponsByMaxPrice">
            <h1 style={{ textAlign: "center" }}>Company Coupons By Price</h1>
            <hr />
            <Typography id="input-slider" gutterBottom>
                Max Price: {value}
            </Typography>
            <Box textAlign={"center"} width="90%">
                <Slider
                    getAriaLabel={() => "maxPrice"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    max={1000}
                />
            </Box>
            {companyCoupons.length > 0 ? (
                companyCoupons.map((item) => (
                    <SingleCoupon key={item.id} coupon={item} />
                ))
            ) : (
                <Typography>No coupons available at this price range.</Typography>
            )}
            <br />
            <br />
            <Button variant="contained" color="error" onClick={goBack}>
                Back
            </Button>
        </div>
    );
}

export default GetCouponsByMaxPrice;
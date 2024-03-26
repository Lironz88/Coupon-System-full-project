import { useLocation, useNavigate } from "react-router-dom";
import "./GetAllCompanyCoupons.css";
import { useEffect, useState } from "react";
import SingleCoupon from "../../AdminArea/SingleCoupon/SingleCoupon";
import Button from "@mui/material/Button";
import jwtAxios from "../../../Service/jwtAxios";
import { CouponModel } from "../../../Models/CouponModel";
import { useSelector } from "react-redux";
import { AuthState } from "../../../redux/authState";
function GetAllCompanyCoupons(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [companyCoupons, setCompanyCoupons] = useState<CouponModel[]>([]);
  const getUserType = useSelector((state: { AuthState: AuthState }) => state.AuthState.userType);

  useEffect(() => {
    const fetchCompanyCoupons = async () => {
      try {
        const response = await jwtAxios.get("http://localhost:8080/Lirons/company/getAllCoupons");
        if (!response.data) {
          throw new Error("Failed to fetch coupons.");
        }

        const couponsData = response.data;

        setCompanyCoupons(couponsData || []);
        console.log("Fetched company coupons:", couponsData);
      } catch (error) {
        console.error("Error fetching company coupons:", error);
      }
    };

    fetchCompanyCoupons();
  }, []);

  const goBack = () => {
    navigate("/company/companyMainPage");
  };

  return (
    <div className="getAllCompanyCoupons">
      <h1 style={{ textAlign: "center" }}>Company Coupons</h1>
      <hr />
      {companyCoupons.length === 0 ? (
        <p>No coupons available for this company.</p>
      ) : (
        companyCoupons.map((item) => (
          <SingleCoupon key={item.id} coupon={item} />
        ))
      )}
      <br />
      <br />
      <Button variant="contained" color="error" onClick={goBack}>
        Back
      </Button>
    </div>
  );
}

export default GetAllCompanyCoupons;

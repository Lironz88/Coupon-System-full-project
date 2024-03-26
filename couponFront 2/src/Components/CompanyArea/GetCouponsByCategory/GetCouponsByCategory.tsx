import "./GetCouponsByCategory.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtAxios from "../../../Service/jwtAxios";
import notify from "../../../Service/NotificationService";
import { ErrMsg } from "../../../Service/NotificationService";
import { CompanyModel } from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SingleCoupon from "../../AdminArea/SingleCoupon/SingleCoupon";
import { CategoryType } from "../../../Models/CategoryType";
import { store } from "../../../redux/store";
import globals from "../../../Service/globals";

function GetCouponByCategory(): JSX.Element {
    const navigate = useNavigate();
    let singleCompany = store.getState().companyState.company[0];
    const [companyCoupons, setCompanyCoupons] = useState<CouponModel[]>(
      singleCompany.coupons || [] // Initialize as an empty array if undefined
    );
    const [category, setCategory] = useState("");

    useEffect(() => {
      if (store.getState().AuthState.userType !== "COMPANY") {
        notify.error(ErrMsg.NO_LOGIN);
        navigate("/login");
      }
    }, []);

    const send = async (myCategory: string) => {
      try {
        const response = await jwtAxios.get(globals.urls.getAllCompanyCouponsByCategory + myCategory);
        setCategory(myCategory);
        setCompanyCoupons(response.data); // Update the state with the fetched coupons
      } catch (error) {
        console.error("Error fetching coupons by category:", error);
      }
    };

    const handleChange = (event: SelectChangeEvent) => {
      send(event.target.value as string);
    };

    const goBack = () => {
      navigate("/company/companyMainPage");
    };

    return (
        <div className="getCouponByCategory">
          <h1 style={{ textAlign: "center" }}>Company Coupons By Category</h1>
          <hr />
          <FormControl fullWidth>
            <InputLabel id="myCategory">Category</InputLabel>
            <Select
              labelId="myCategory"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              {Object.values(CategoryType).map((item: string, index: number) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {companyCoupons.map((item: CouponModel) => (
            <SingleCoupon key={item.id} coupon={item} />
          ))}
          <br />
          <br />
          <Button variant="contained" color="error" onClick={goBack}>
            Back
          </Button>
        </div>
    );
}

export default GetCouponByCategory;

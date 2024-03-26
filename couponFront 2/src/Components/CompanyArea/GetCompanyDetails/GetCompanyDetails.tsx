import "./GetCompanyDetails.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import notify from "../../../Service/NotificationService";
import { ErrMsg } from "../../../Service/NotificationService";
import Button from "@mui/material/Button";
import { CompanyModel } from "../../../Models/CompanyModel";
import SingleCompany from "../../AdminArea/SingleCompany/SingleCompany";

function GetCompanyDetails(): JSX.Element {
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyModel>({
    id: 0, // You can set an initial value for id, or leave it as 0
    name: "",
    email: "",
    password: "",
    coupons: [] // Assuming coupons is an array
  });

  useEffect(() => {
    if (store.getState().AuthState.userType !== "COMPANY") {
      notify.error(ErrMsg.NO_LOGIN);
      navigate("/login");
    }
    setCompany(store.getState().companyState.company[0]);
  }, []);

  const showDetails = () => {
    return (
      <>
        <div>
          <SingleCompany key={company.id} company={company} />
        </div>
      </>
    );
  };

  const goBack = () => {
    navigate("/company/companyMainPage");
  };

  return (
    <div className="getCompanyDetails">
      <h1>My details</h1>
      <hr />
      {showDetails()}
      <br /><br />
      <Button variant="contained" color="error" onClick={goBack}>
        Back
      </Button>
    </div>
  );
}

export default GetCompanyDetails;

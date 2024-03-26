import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { updateToken } from "../../../../redux/authState";
import { store } from "../../../../redux/store";
import notify, { ErrMsg } from "../../../../Service/NotificationService"
import SingleCompany from "../../SingleCompany/SingleCompany";
import { Button } from "@mui/material";
import "./GetAllCompanies.css";

function GetAllCompanies(): JSX.Element {
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.getState().AuthState.userType !== "ADMIN") {
            notify.error(ErrMsg.NOT_AUTHORIZED);
            navigate("/login");
        }
        setCompanies(store.getState().companyState.company);
    }, []);

    const goBack = () => {
        navigate("/admin/adminMainPage");
    }

    return (
        <div className="GetAllCompanies">
            <h1>Companies</h1><hr />
            {companies.map(item => <SingleCompany key={item.id} company={item} />)}
            <br /><br />
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default GetAllCompanies;

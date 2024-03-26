import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { store } from "../../../redux/store";
import "./SingleCompany.css";

interface SingleCompanyProps {
    company: CompanyModel;
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const navigate = useNavigate();

    const updateCompany = () => {
        navigate("/Lirons/admin/updateCompany", { state: { companyId: props.company.id } });
    };

    const couponList = () => {
        navigate("/Lirons/company/getAllCoupons", { state: { companyId: props.company.id } });
    };

    return (
        <div className="SingleCompany SolidBox">
            <h2 style={{ textAlign: "center" }}>{props.company.id}</h2>
            <hr />
            {props.company.name}<br /><br />
            {props.company.email}<br /><br />
            <ButtonGroup variant="contained" fullWidth>
                {getUserType === "COMPANY" &&
                    <Button color="warning" onClick={couponList}>Coupons</Button>
                }
                {getUserType === "ADMIN" &&
                    <Button color="warning" onClick={updateCompany}>Edit Company</Button>
                }
            </ButtonGroup>
        </div>
    );
}

export default SingleCompany;

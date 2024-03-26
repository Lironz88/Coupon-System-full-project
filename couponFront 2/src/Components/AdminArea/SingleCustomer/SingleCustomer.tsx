import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import { store } from "../../../redux/store";
import "./SingleCustomer.css";

interface SingleCustomerProps {
    customer: CustomerModel;
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const navigate = useNavigate();

    const updateCustomer = () => {
        navigate("/Lirons/admin/updateCustomer", { state: { customerId: props.customer.id } });
    };

    const couponList = () => {
        navigate("/Lirons/customer/getAllCustomersCoupons");
    };

    return (
        <div className="SingleCustomer SolidBox">
            <h2 style={{ textAlign: "center" }}>{props.customer.id}</h2>
            <hr />
            {props.customer.firstName + " " + props.customer.lastName}<br /><br />
            {props.customer.email}<br /><br />
            <ButtonGroup variant="contained" fullWidth>
                {getUserType === "CUSTOMER" &&
                    <Button color="warning" onClick={couponList}>Coupons</Button>
                }
                {getUserType === "ADMIN" &&
                    <Button color="warning" onClick={updateCustomer}>Edit Customer</Button>
                }
            </ButtonGroup>
        </div>
    );
}

export default SingleCustomer;

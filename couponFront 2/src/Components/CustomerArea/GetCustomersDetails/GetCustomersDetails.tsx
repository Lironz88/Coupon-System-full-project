import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import notify from "../../../Service/NotificationService";
import { ErrMsg } from "../../../Service/NotificationService";
import { CustomerModel } from "../../../Models/CustomerModel";
import SingleCustomer from "../../AdminArea/SingleCustomer/SingleCustomer";
import { Button } from "@mui/material";
import "./GetCustomersDetails.css";

function GetCustomersDetails(): JSX.Element {
    const navigate = useNavigate();
    const defaultCustomer: CustomerModel = {
        id: undefined, 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '',
        coupons: [],
    };
    const [customer, setCustomer] = useState<CustomerModel>(defaultCustomer);

    useEffect(()=>{
        if (store.getState().AuthState.userType!= "CUSTOMER"){
            notify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        setCustomer(store.getState().customerState.customer[0]);
    }, [])

    const goHome= ()=>{
        navigate("/customer/customerMainPage");
    }


    return (
        <div className="GetCustomersDetails">
            <h1>My details</h1><hr/>
            <SingleCustomer key={customer.id} customer={customer}/>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}>Back</Button>
        </div>
    );
}

export default GetCustomersDetails;

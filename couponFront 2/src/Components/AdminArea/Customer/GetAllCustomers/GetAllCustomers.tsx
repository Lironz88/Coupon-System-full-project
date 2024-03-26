import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../Models/CustomerModel";
import { useEffect, useState } from "react";
import jwtAxios from "../../../../Service/jwtAxios";
import globals from "../../../../Service/globals";
import notify, { ErrMsg } from "../../../../Service/NotificationService";
import SingleCustomer from "../../SingleCustomer/SingleCustomer";
import { store } from "../../../../redux/store";
import { Button } from "@mui/material";
import "./GetAllCustomers.css";

function GetAllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const[customers, setCustomers] = useState<CustomerModel[]>([]);

    useEffect(()=>{
        if(store.getState().AuthState.userType!="ADMIN"){
            notify.error(ErrMsg.NOT_AUTHORIZED);
            navigate("/login");
        }
        setCustomers(store.getState().customerState.customer);
    },[]);

    const goBack = ()=>{
        navigate("/admin/adminMainPage");
    }

    return (
        <div className="GetAllCustomers">
            <h1>Customers</h1><hr/>
			{customers.map(item=><SingleCustomer key={item.id} customer={item}/>)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default GetAllCustomers;

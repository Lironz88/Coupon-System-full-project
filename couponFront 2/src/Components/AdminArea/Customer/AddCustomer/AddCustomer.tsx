import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notify, { SccMsg } from "../../../../Service/NotificationService";
import { CustomerModel } from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Service/jwtAxios";
import globals from "../../../../Service/globals";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useDispatch } from "../../../../redux/useDispatch";
import { loginUser } from "../../../../redux/authState";
import "./AddCustomer.css";
import { downloadSingleCustomer } from "../../../../redux/customerState";
import { store } from "../../../../redux/store";

function AddCustomer(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUserType = store.getState().AuthState.userType;

    const send = (customer: CustomerModel) => {
        jwtAxios.post(globals.urls.addCustomer, customer)
            .then(response => {
                notify.success(SccMsg.CUSTOMER_ADD);
                let userDetails = {
                    email: customer.email,
                    pass: customer.password,
                    clientType: "CUSTOMER",
                };
                return jwtAxios.post(globals.urls.login, userDetails);
            })
            .then(response => {
                notify.success(SccMsg.LOGIN_APPROVED);
                dispatch(loginUser(response.headers.authorization));
                return jwtAxios.get<CustomerModel>(globals.urls.getCustomerDetails);
            })
            .then(response => {
                if (getUserType === "ADMIN") {
                    navigate("/admin/adminMainPage");
                } else {
                    let SingleCustomer = response.data;
                    dispatch(downloadSingleCustomer(SingleCustomer));
                    navigate("/customer/customerMainPage");
                }

            })
            .catch(err => {
                notify.error(err.response?.data?.details || "An error occurred");
            });
    };

    const goBack = () => {
        if (getUserType === "ADMIN") {
            navigate("/admin/adminMainPage");
        } else {
            navigate("/register");
        }
    };
    return (
        <div className="AddCustomer SolidBox">
            <Typography variant="h3" className="Headline">Add Customer</Typography>
            <form onSubmit={handleSubmit(send)}>
                <TextField label="First Name" variant="outlined" fullWidth
                    {...register("firstName", { required: "Missing first name" })} />
                <span>{errors.firstName?.message}</span>
                <br /><br />

                <TextField label="Last Name" variant="outlined" fullWidth
                    {...register("lastName", { required: "Missing last name" })} />
                <span>{errors.lastName?.message}</span>
                <br /><br />

                <TextField label="Email" variant="outlined" fullWidth
                    {...register("email", { required: "Missing Email" })} />
                <span>{errors.email?.message}</span>
                <br /><br />

                <TextField label="Password" variant="outlined" type="password" fullWidth
                    {...register("password", { required: "Missing password" })} />
                <span>{errors.password?.message}</span>
                <br /><br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Add Customer</Button>
                </ButtonGroup>
            </form>
            <Button variant="contained" color="error" onClick={goBack}>Back</Button>
        </div>
    );
}

export default AddCustomer;

import "./UpdateCustomer.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import notify, { SccMsg } from "../../../../Service/NotificationService";
import { CustomerModel } from "../../../../Models/CustomerModel";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../Service/jwtAxios";
import globals from "../../../../Service/globals";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { deleteCustomer, updateCustomer } from "../../../../redux/customerState";
import { ErrMsg } from "../../../../Service/NotificationService";
import { useDispatch } from "../../../../redux/useDispatch";


function UpdateCustomer(): JSX.Element {
    const location = useLocation();
    const { customerId } = location.state as any;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialCustomerState: CustomerModel = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '', 
    };

    const [customer, setCustomer] = useState<CustomerModel>(initialCustomerState);
    const { register, handleSubmit } = useForm<CustomerModel>();

    useEffect(() => {
        const foundCustomer = store.getState().customerState.customer.find(item => customerId === item.id);
        if (foundCustomer) {
            setCustomer(foundCustomer);
        }
    }, [customerId]);

    const goBack = () => {
        navigate("/Lirons/admin/allCustomers");
    };

    const send = () => {
        jwtAxios.put(globals.urls.updateCustomer, customer)
            .then(response => {
                if (response.status < 300) {
                    notify.success(SccMsg.CUSTOMER_UPDATE);
                    dispatch(updateCustomer(customer));
                    goBack();
                } else {
                    notify.error(response.data.details);
                }
            })
            .catch(err => {
                notify.error(err.response.data.details);
            });
    };

    const removeCustomer = () => {
        jwtAxios.delete(`${globals.urls.deleteCustomer}${customer.id}`)
            .then(response => {
                if (response.status < 300) {
                    notify.success(`Customer ${customer.firstName} ${customer.lastName} was deleted`);
                    dispatch(deleteCustomer(customer.id!));
                    goBack();
                } else {
                    notify.error(response.data);
                }
            })
            .catch(err => {
                notify.error(err.response.data.details);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    return (
        <div className="updateCustomer SolidBox">
            <h1 style={{ textAlign: "center" }}>Update Customer Details</h1>
            <h3 style={{ textAlign: "center" }}> Company ID: {customer.id}</h3>
            <hr />
            <form onSubmit={handleSubmit(send)}>
                    <TextField
                    name="First Name"
                    label={customer.firstName}
                    variant="outlined"
                    className="TextBox"
                    fullWidth
                    disabled
                    helperText="First Name"
                />
                <br /><br />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    className="TextBox"
                    fullWidth
                    value={customer.lastName}
                    {...register("lastName", {
                        required: "Missing lastName"
                    })}
                    onChange={handleChange}
                />
                <br /><br />
                <TextField
                    label="Email"
                    variant="outlined"
                    className="TextBox"
                    fullWidth
                    value={customer.email}
                    {...register("email", {
                        required: "Missing Email"
                    })}
                    onChange={handleChange}
                />
                <br /><br />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    className="TextBox"
                    fullWidth
                    value={customer.password}
                    {...register("password", {
                        required: "Missing password"
                    })}
                    onChange={handleChange}
                />
                <br /><br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Update</Button>
                    <Button variant="contained" color="warning" onClick={removeCustomer}>Delete</Button>
                </ButtonGroup>
            </form>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}>Back</Button>
        </div>
    );
}

export default UpdateCustomer;
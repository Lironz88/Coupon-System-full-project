import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../../redux/useDispatch"
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import globals from "../../../Service/globals";
import jwtAxios from "../../../Service/jwtAxios";
import notify, { SccMsg } from "./../../../Service/NotificationService";
import { loginUser } from "../../../redux/authState";
import { store } from "../../../redux/store";
import { downloadCompanies, downloadSingleCompany } from "./../../../redux/companyState";
import { CompanyModel } from "../../../Models/CompanyModel";
import { CustomerModel } from "../../../Models/CustomerModel";
import { downloadCustomers, downloadSingleCustomer } from "./../../../redux/customerState";
import "./Login.css";

function Login(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientType, setClientType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setClientType(event.target.value as string);
  };

  const send = (details: UserModel) => {
    jwtAxios.post(globals.urls.login, details)
      .then((response) => {
        notify.success(SccMsg.LOGIN_APPROVED);
        dispatch(loginUser(response.headers.authorization));
        console.log(store.getState().AuthState.userType);
        if (store.getState().AuthState.userType === "ADMIN") {
          jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies)
            .then((response) => {
              store.dispatch(downloadCompanies(response.data));
            })
            .catch((err) => {
              notify.error(err.response.data.details);
            });
          jwtAxios.get<CustomerModel[]>(globals.urls.getAllCustomers)
            .then((response) => {
              store.dispatch(downloadCustomers(response.data));
            })
            .catch((err) => {
              notify.error(err.response.data.details);
            });
          navigate("/admin/adminMainPage");
        }
        if (store.getState().AuthState.userType === "COMPANY") {
          jwtAxios.get<CompanyModel>(globals.urls.getCompanyDetails)
            .then((response) => {
              let SingleCompany = response.data;
              store.dispatch(downloadSingleCompany(SingleCompany));
            });
          navigate("/company/companyMainPage");
        }
        if (store.getState().AuthState.userType === "CUSTOMER") {
          jwtAxios.get<CustomerModel>(globals.urls.getCustomerDetails)
          .then((response)=>{
            let SingleCustomer= response.data;
            store.dispatch(downloadSingleCustomer(SingleCustomer));
          });
          navigate("/customer/customerMainPage");
        }
      })
      .catch((err) => {
        notify.error(err.response.data.details);
      });

  };

  return (
    <div className="login SolidBox">
      <Typography variant="h3" className="HeadLine">Login</Typography>
      <br /><br />
      <form onSubmit={handleSubmit(send)}>
        <FormControl fullWidth>
          <InputLabel id="clientType">client Type</InputLabel>
          <Select 
            labelId="clientType" 
            value={clientType} 
            label="clientType" 
            {...register("clientType", {
              required: {
                  value: true,
                  message: 'Missing client type'
              }
            })}
            onChange={handleChange}
          >
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
            <MenuItem value={"COMPANY"}>COMPANY</MenuItem>
          </Select>
          <Typography variant="caption" color="error">{errors.clientType?.message}</Typography>
        </FormControl>
        <br /><br />
        <TextField 
          label="email" 
          variant="outlined"  
          className="TextBox" 
          fullWidth 
          {...register("email", {
            required: "Missing Email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            }
          })}
        />
        <Typography variant="caption" color="error">{errors.email?.message}</Typography>
        <br /><br />
        <TextField 
          label="pass" 
          variant="outlined" 
          className="TextBox" 
          type="password" 
          fullWidth 
          {...register("pass", {
            required: {
                value: true,
                message: "Missing password",
              },
          })}
        />
        <Typography variant="caption" color="error">{errors.pass?.message}</Typography>
        <br /><br />
        <NavLink to="/register">New user? create account</NavLink>
        <br /><br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">Login</Button>
        </ButtonGroup>
      </form>
    </div>
  );
  
  
}
export default Login;

import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import notify from "../../../../Service/NotificationService";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../Service/jwtAxios";
import globals from "../../../../Service/globals";
import {
  removeAll, downloadCompanies,
  downloadSingleCompany, addCompany
} from "../../../../redux/companyState";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { loginUser } from "../../../../redux/authState";
import { useDispatch } from "../../../../redux/useDispatch";
import "./AddCompany.css";
import { SccMsg, ErrMsg } from "../../../../Service/NotificationService";
import { UserModel } from "../../../../Models/UserModel";

function AddCompany(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserType = store.getState().AuthState.userType;

  const send = (company: CompanyModel) => {
    company.coupons = [];
    jwtAxios
      .post(globals.urls.addCompany, company)
      .then((response) => {
        console.log(response);
        if (response.status < 300) {
          notify.success("Company added");
          let fullCompany = response.data;
          store.dispatch(addCompany(fullCompany));
        } else {
          notify.error(response.data.details);
        }
      })
      .then(() => {
        if (getUserType === "ADMIN") {
          navigate("/admin/adminMainPage");
        } else {
          let userDetails: UserModel = {
            email: company.email,
            pass: company.password,
            clientType: "COMPANY",
          };
          jwtAxios.post(globals.urls.login, userDetails).then((response) => {
            notify.success(SccMsg.LOGIN_APPROVED);
            dispatch(loginUser(response.headers.authorization));
            console.log(store.getState().AuthState.userType);
            navigate("/company/companyMainPage");
          });
        }
      })
      .catch((err) => {
        notify.error(err.response.data.details);
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
    <div className="addCompany SolidBox">
      <Typography variant="h3" className="HeadLine">
        Add Company:
      </Typography>
      <form onSubmit={handleSubmit(send)}>
        <TextField
          label="name"
          variant="outlined"
          fullWidth
          {...register("name", {
            required: {
              value: true,
              message: "Missing company name",
            },
          })}
        />
        <span>{errors.name?.message}</span>
        <br />
        <br />
        <br />
        <TextField
          label="email"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("email", {
            required: {
              value: true,
              message: "Missing Email",
            },
          })}
        />
        <span>{errors.email?.message}</span>
        <br />
        <br />
        <br />
        <TextField
          label="password"
          variant="outlined"
          className="TextBox"
          type="password"
          fullWidth
          {...register("password", {
            required: {
              value: true,
              message: "Missing password",
            },
          })}
        />
        <span>{errors.password?.message}</span>
        <br />
        <br />
        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">Add</Button>
        </ButtonGroup>
      </form>
      <Button variant="contained" color="error" onClick={goBack}>Back</Button>
    </div>
  );
}

export default AddCompany;

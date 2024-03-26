import { Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { deleteCompany, updateCompanies } from "../../../../redux/companyState";
import { store } from "../../../../redux/store";
import globals from "../../../../Service/globals";
import jwtAxios from "../../../../Service/jwtAxios";
import notify, { SccMsg } from "../../../../Service/NotificationService";
import { useDispatch } from "../../../../redux/useDispatch";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {
    const location = useLocation();
    const { companyId } = location.state as any;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const initialCompanyState: CompanyModel = {
        id: 0,
        name: '',
        email: '',
        password: '',
    };
    const [company, setCompany] = useState<CompanyModel>(initialCompanyState);
    const { register, handleSubmit } = useForm<CompanyModel>();

    useEffect(() => {
        const foundCompany = store.getState().companyState.company.find(item => companyId === item.id);
        if (foundCompany) {
            setCompany(foundCompany);
        }
    }, [companyId]);

    const goBack = () => {
        navigate("/Lirons/admin/allCompanies");
    };

    const send = () => {
        jwtAxios.put(globals.urls.updateCompany, company)
            .then(response => {
                if (response.status < 300) {
                    notify.success(SccMsg.COMPANY_UPDATE);
                    dispatch(updateCompanies(company));
                    goBack();
                } else {
                    notify.error("Something went wrong");
                }
            })
            .catch(err => {
                notify.error(err.response.data.details);
            });
    };

    const removeCompany = () => {
        jwtAxios.delete(globals.urls.deleteCompany + companyId)
            .then(response => {
                if (response.status < 300) {
                    notify.success(`Company ${company.name} was deleted`);
                    dispatch(deleteCompany(company.id!));
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
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    return (
        <div className="updateCompany SolidBox">
            <h1 style={{ textAlign: "center" }}>Update Company Details</h1>
            <hr />
            <h3 style={{ textAlign: "center" }}> Company ID: {company.id}</h3>
            <form onSubmit={handleSubmit(send)}>
                <TextField
                    name="name"
                    label={company.name}
                    variant="outlined"
                    className="TextBox"
                    fullWidth
                    disabled
                    helperText="Company Name"
                />
                <br /><br />
                <TextField
                    label="Email"
                    variant="outlined"
                    className="TextBox"
                    fullWidth
                    value={company.email}
                    {...register("email", {
                        required: {
                            value: true,
                            message: 'Missing Email'
                        }
                    })}
                    onChange={handleChange}
                    helperText="Company Email"
                />
                <br /><br />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    className="TextBox"
                    fullWidth
                    value={company.password}
                    {...register("password", {
                        required: {
                            value: true,
                            message: 'Missing password'
                        }
                    })}
                    onChange={handleChange}
                    helperText="Update Password"
                />
                <br /><br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Update</Button>
                    <Button variant="contained" color="warning" onClick={removeCompany}>Delete</Button>
                </ButtonGroup>
            </form>
            <Button variant="contained" color="error" onClick={goBack}>Back</Button>
        </div>
    );
}

export default UpdateCompany;
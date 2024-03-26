import "./AdminArea.css";
import { makeStyles } from '@mui/styles';
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import globals from "../../Service/globals";
import theme from "../../Service/Theme";

function AdminArea(): JSX.Element {
    const navigate = useNavigate();

    const getCompanies = ()=>{
        navigate("/Lirons/admin/allCompanies")
    }
    
    const getCustomers = ()=>{
        navigate("/Lirons/admin/allCustomers")
    }
    const addCompany = ()=>{
        navigate("/Lirons/admin/addCompany");
    }

    const addCustomer = ()=>{
        navigate("/Lirons/admin/addCustomer");
    }

    const buttonStyle = {
        width: '330px', // Set a fixed width for all buttons
    };

    return (
        <div className="adminMainPage">
            <span></span>
            <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={getCompanies}>Show me the companies</Button>
            <span> </span>
            <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={getCustomers}>Show me the customers</Button>
            <span> </span>
            <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={addCompany}>Add a new company</Button>
            <span> </span>
            <Button variant="outlined" color="secondary" sx={buttonStyle} onClick={addCustomer}>Add a new customer</Button>
        </div>
    );
}


export default AdminArea;


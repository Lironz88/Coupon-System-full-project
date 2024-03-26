
import { useNavigate } from "react-router";
import {Button, ButtonGroup, Typography} from "@mui/material"
import globals from "../../../Service/globals";
import "./RegisterButton.css";

function RegisterButton(): JSX.Element {
    const navigate = useNavigate();

    const addCompany= () => {
        navigate("/guest/addCompany");
    }
    const addCustomer = () => {
        navigate("/guest/addCustomer");
    }
    const goHome =()=>{
        navigate("/Login");
    }
    return (
        <div className="RegisterButton">
			<Typography variant="h3" className="HeadLine">Hello new user</Typography>
            <ButtonGroup variant="contained">
                <Button type="submit" color="primary" onClick={addCompany}>Company</Button>
                <Button type="submit" color="primary" onClick={addCustomer}>Customer</Button>
            </ButtonGroup>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}>Back</Button>
        </div>
    );
}

export default RegisterButton;

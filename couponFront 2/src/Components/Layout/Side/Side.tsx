import LogoutButton from "../../AuthArea/LogoutButton/LogoutButton";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import "./Side.css";

function Side(): JSX.Element {

    return (
        <div className="Side column">
             <LogoutButton />
        </div>
    );
}

export default Side;

import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import Button from "@mui/material/Button";
import { logOutUser } from './../../../redux/authState';
import "./LogoutButton.css"; // Make sure the CSS file is imported

function LogoutButton(): JSX.Element {
    const getState = store.getState().AuthState.userType;
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };

    const logOut = () => {
        store.dispatch(logOutUser());
        navigate("/Login");
    };

    const goToCoupons = () => {
        navigate("/guest/coupons");
    };

    const checkIsLogin = () => {
        if (getState === '') {
            return (
                <div className="button-container">
                    <Button variant="contained" color="warning" onClick={goToCoupons}>Coupons</Button>
                    <Button variant="contained" color="warning" onClick={goToLogin}>Login</Button>
                    <Button variant="contained" color="warning" onClick={() => navigate("/register")}>Register</Button>
                </div>
            );   
        }
        return (
            <div className="button-container">
                <Button variant="contained" color="warning" onClick={logOut}>LogOut</Button>
            </div>
        );
    };

    return (
        <div className="myHeader botton-padding">
            {checkIsLogin()}
        </div>
    );
}

export default LogoutButton;

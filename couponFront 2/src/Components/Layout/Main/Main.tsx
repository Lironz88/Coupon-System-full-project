import { Outlet } from "react-router";
import Routing from "../../Routing/Routing";
import "./Main.css";


function Main(): JSX.Element {
    return (
        <div className="Main">
            <Routing/>
            <Outlet/>
        </div>
    );
}

export default Main;

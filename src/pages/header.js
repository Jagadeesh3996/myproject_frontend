
import { Outlet } from "react-router-dom";

const Header = () =>{
    return(<>
        <div className="header">
            <h1>My App</h1>
        </div>
        <Outlet/>
    </>)
}

export default Header;
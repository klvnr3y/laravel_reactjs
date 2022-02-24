import { Link } from "react-router-dom";
import companyInfo from "../../providers/companyInfo";

const appLogo = companyInfo().appLogo;

export default function Sidemenu() {
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element text-center">
                            <img
                                alt="image"
                                src={appLogo}
                                style={{ width: "80%" }}
                            />
                        </div>
                        <div className="logo-element">LR</div>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            <i className="fa fa-th-large"></i>{" "}
                            <span className="nav-label">Dashboards</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user">
                            <i className="fa fa-users"></i>{" "}
                            <span className="nav-label">User</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

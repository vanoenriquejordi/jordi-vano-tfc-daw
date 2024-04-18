import { Link } from "react-router-dom";
import style from "./dashboardWrapperView.module.css";

export default function DashboardWrapper({children}){
    return (
        <div>
            <nav className={style.nav}>
                <img className={style.logoHeader} src="./img/white-logo.png" alt=""/>
                <Link to="/dashboard">Links</Link>
                <Link to="/profile">Perfil</Link>
                <Link to="/signout">Salir</Link>
            </nav>
            <div className={"main-container"}>{children}</div>
        </div>
    )
}
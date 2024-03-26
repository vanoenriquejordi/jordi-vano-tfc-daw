import { Link } from "react-router-dom";
import style from "./dashboardWrapperView.module.css";

export default function DashboardWrapper({children}){
    return (
        <div>
            <nav className={style.nav}>
                <div className={style.logo}>Logotipo</div>
                <Link to="/dashboard">Links</Link>
                <Link to="/dashboard/profile">Perfil</Link>
                <Link to="/signout">Salir</Link>
            </nav>
            <div className={"main-container"}>{children}</div>
        </div>
    )
}
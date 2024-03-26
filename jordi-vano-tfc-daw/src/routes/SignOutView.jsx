import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase";

export default function SignOutView(){

    const navigate = useNavigate();

    function handleUserNotRegistered(user){
        navigate("/login");
    }
    function handleUserNotLoggedIn(){
        navigate("/login");
    }
    async function handleUserLoggedIn(user){
        await logout();
    } 
    return (
        <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        >

        </AuthProvider>
    )
}
import { 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithPopup 
} from "firebase/auth";
import { auth, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import style from "./loginView.module.css";

export default function LoginView(){

    const navigate = useNavigate();

    // const [currentUser, setCurrentUser] = useState(null);
    /*
    State:
    0-> Inicializado
    1-> Loading
    2-> Loading completo
    3-> Login pero sin registro
    4-> No hay nadie logueado
    5-> Ya existe username
    6-> nuevo username, click para continuar
    */
    const [state, setCurrentState] = useState(0);


    // useEffect(() => {
    //     setCurrentState(1);
    //     onAuthStateChanged(auth, async (user)=>{
    //         if  (user) {
    //             const isRegistered = await userExist(user.uid);
    //             if(isRegistered){
    //                 //TODO: redirigir a Dashboard
    //                 navigate("/dashboard");
    //                 setCurrentState(2);
    //             }else{
    //                 //TODO: redirigir a elegir usuario
    //                 navigate("/choose-username")
    //             setCurrentState(3);
    //         }
    //         } else{
    //             setCurrentState(4);
    //             console.log("No hay nadie autenticado...");
    //         }
    //     });
    // }, [navigate]);

    async function handleOnClick(){
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider);
    }

    async function signInWithGoogle(googleProvider){
        try{
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res);
        }catch(error){
            console.error(error);
        }
    }

    function handleUserLoggedIn(user){
        navigate('/dashboard');
    }
    function handleUserNotLoggedIn(user){
        setCurrentState(4);
    }
    function handleUserNotRegistered(){
        navigate('/choose-username');
    }

    // if(state === 2){
    //     return <div>Estás autenticado y registrado</div>;
    // }
    // if(state === 3){
    //     return <div>Estás autenticado pero no registrado</div>;
    // }
    if(state === 4){
        return(
        <div className={style.loginView}>
            <h1>Va En Redes</h1>          
            <button className={style.provider} onClick={handleOnClick}>Inicia sesión con Google</button>
        </div>);
    }
        return (
            <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}>
                <div>Cargando...</div>
            </AuthProvider>
            
        );
}
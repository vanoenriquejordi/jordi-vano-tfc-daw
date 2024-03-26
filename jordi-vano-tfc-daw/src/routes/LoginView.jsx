import { 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithPopup 
} from "firebase/auth";
import { auth, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginView(){

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    /*
    State:
    0-> Inicializado
    1-> Loading
    2-> Loading completo
    3-> Login pero sin registro
    4-> No hay nadie logueado
    */
    const [state, setCurrentState] = useState(0);


    useEffect(() => {
        setCurrentState(1);
        onAuthStateChanged(auth, async (user)=>{
            if  (user) {
                const isRegistered = await userExist(user.uid);
                if(isRegistered){
                    //TODO: redirigir a Dashboard
                    navigate("/dashboard");
                    setCurrentState(2);
                }else{
                    //TODO: redirigir a elegir usuario
                    navigate("/choose-username")
                setCurrentState(3);
            }
            } else{
                setCurrentState(4);
                console.log("No hay nadie autenticado...");
            }
        });
    }, [navigate]);

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

    if(state === 2){
        return <div>Estás autenticado y registrado</div>;
    }
    if(state === 3){
        return <div>Estás autenticado pero no registrado</div>;
    }
    if(state === 4){
        return<div><button onClick={handleOnClick}>Inicia sesión con Google</button></div>;
    }
        return (
            <div>Cargando...</div>
        )
}
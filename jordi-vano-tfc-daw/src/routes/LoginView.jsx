import { 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithPopup 
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function LoginView(){

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
        onAuthStateChanged(auth, handleUserStateChanged);
    }, []);

    function handleUserStateChanged(user){
        if  (user) {
            setCurrentState(3);
            console.log("Logueado como: ", user.email);
        } else{
            setCurrentState(4);
            console.log("No hay nadie autenticado...");
        }
    }

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
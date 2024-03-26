import { 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithPopup 
} from "firebase/auth";
import { auth, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
    children, 
    onUserLoggedIn, 
    onUserNotLoggedIn, 
    onUserNotRegistered 
}) {

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user)=>{
            if  (user) {
                const isRegistered = await userExist(user.uid);
                if(isRegistered){
                    onUserLoggedIn(user);
                }else{
                    onUserNotRegistered(user);
                }
            } else{
                onUserNotLoggedIn(user);
            }
        });
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);
    return <div>{children}</div>
}
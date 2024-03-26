import { 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithPopup 
} from "firebase/auth";
import { auth, getUserInfo, registerNewUser, userExist } from "../firebase/firebase";
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
                    const userInfo = await getUserInfo(user.uid);
                    if(userInfo.processCompleted){
                        onUserLoggedIn(userInfo);
                    }else{
                        onUserNotRegistered(userInfo);
                    }
                }else{
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: '',
                        username: '',
                        processCompleted: false,
                    });
                    onUserNotRegistered(user);
                }
            } else{
                onUserNotLoggedIn(user);
            }
        });
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);
    return <div>{children}</div>
}
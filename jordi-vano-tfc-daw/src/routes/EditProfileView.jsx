import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { useState, useRef } from "react";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "../firebase/firebase";

export default function EditProfileView(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [state, setState] = useState(0);
    const [profileUrl, setProfileUrl] = useState(null);
    const fileRef= useRef(null);

    async function handleUserLoggedIn(user){
        setCurrentUser(user);
        const url = await getProfilePhotoUrl(user.profilePicture);
        setProfileUrl(url);
        setState(2);
    }

    function handleUserNotRegistered(user){
        navigate("/login");
    }

    function handleUserNotLoggedIn(){
        navigate("/login");
    }

    function handleOpenFilePicker(){
        if(fileRef.current){
            fileRef.current.click();
        }
    }

    function handleChangeFile(e){
        const files = e.target.files;
        const fileReader = new FileReader();

        if(fileReader && files && files.length > 0){
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function(){
                const imageData = fileReader.result;

                const res = await setUserProfilePhoto(currentUser.uid, imageData);
                if(res){
                    const tmpUser = {...currentUser};
                    tmpUser.profilePicture = res.metadata.fullPath;
                    await updateUser(tmpUser);
                    setCurrentUser({...tmpUser});

                    const url = await getProfilePhotoUrl(currentUser.profilePicture);
                    setProfileUrl(url);
                }
            }
        }
    }

    if (state !== 2){
        return(
            <AuthProvider 
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotLoggedIn={handleUserNotLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
        ></AuthProvider>
        );
    }

    return (
        <DashboardWrapper>
            <div>
                <h2>Editar información del perfil</h2>
                <div>
                    <img onClick={handleOpenFilePicker} src={profileUrl} alt="" width={100} />
                    <input ref={fileRef} type="file" style={{display:"none"}} onChange={handleChangeFile} />
                </div>
                <div><button>Elige una imagen de perfil</button></div>
            </div>
        </DashboardWrapper>
    );
}
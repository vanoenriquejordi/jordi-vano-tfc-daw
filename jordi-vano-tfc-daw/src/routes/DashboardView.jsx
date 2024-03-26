import AuthProvider from "../components/authProvider";
import { useNavigate } from  'react-router-dom';
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from 'uuid';
import { getLinks, insertNewLink, updateLink, deleteLink } from "../firebase/firebase";
import Link from "../components/link";
import style from "./dashboardView.module.css";
import styleLinks from "../components/link.module.css";

export default function DashboardView(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [state, setState] = useState(0);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [links, setLinks] = useState([]);

    async function handleUserLoggedIn(user){
        setCurrentUser(user);
        setState(2);
        const resLinks = await getLinks(user.uid);
        setLinks([...resLinks]);
    }
    function handleUserNotRegistered(user){
        navigate("/login");
    }

    function handleUserNotLoggedIn(){
        navigate("/login");
    }

    if(state === 0){

    return <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}>
        Cargando...
    </AuthProvider>
    }

    function addLink(){
        if(title !== "" && url !== ""){
            const newlink = {
                id: uuidv4(),
                title: title,
                url: url,
                uid: currentUser.uid,
            };
            const res = insertNewLink(newlink);
            newlink.docId = res.id;
            setTitle("");
            setUrl("");
            setLinks([...links, newlink]);
        }
    }

    function handleOnSubmit(e){
        e.preventDefault();
        addLink();
    }

    function handleOnChange(e){
        const value = e.target.value;
        if(e.target.name === "title"){
            setTitle(value);
        }
        if(e.target.name === "url"){
            setUrl(value);
        }
    }

    async function handleDeleteLink(docId){
        await deleteLink(docId);
        const tmp = links.filter(link => link.docId !== docId);
        setLinks([...tmp])
    }

    async function handleUpdateLink(docId, title, url){
        const link = links.find(item => item.docId === docId);
        link.title = title;
        link.url = url;
        await updateLink(docId, link);
    }

    return(
        <DashboardWrapper>
            <div>
                <h1>Dashboard</h1>

                <form className={style.entryContainer} action="" onSubmit={handleOnSubmit}>

                    <label className={"label"} htmlFor="title">Título</label>
                    <input className={"input"} type="text" name ="title" onChange={handleOnChange}/>
                    
                    <label className={"label"} htmlFor="url">Enlace Url</label>
                    <input className={"input"} type="text" name ="url" onChange={handleOnChange} />
                    
                    <input className={"btn"} type="submit" value="Crear nuevo link" />
                </form>

                <div className={styleLinks.linksContainer}>
                    {links.map((link) => (
                        <Link 
                        key={link.docId} 
                        docId={link.docId}
                        url={link.url} 
                        title={link.title} 
                        onDelete={handleDeleteLink} 
                        onUpdate={handleUpdateLink}
                        />
                    ))}
                </div>
            </div>
        </DashboardWrapper>
    )
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes, } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc, } from "firebase/firestore";
import { async } from "@firebase/util";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage =  getStorage(app);

export async function userExist(uid){
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export async function existsUsername(username){
  const users = [];
  const docsRef = collection(db, "users");
  const consulta = query(docsRef, where("username", "==", username));

  const querySnapshot = await getDocs(consulta);

  querySnapshot.forEach((doc) =>{
    console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user){
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch(error){
    console.log("Error al registrar el usuario");
  }
}

export async function updateUser(user){
  console.log(user);
  try{
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  }catch(error){

  }
}

export async function getUserInfo(uid){
  try {
    const docRef = doc(db,"users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    
  }
}

export async function insertNewLink(link){
  try {
    const docRef = collection(db, "links");
    const res = await addDoc(docRef, link);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getLinks(uid){
  const links = [];
  try {
    const collectionRef = collection(db, "links");
    const consulta = query(collectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(consulta);

    querySnapshot.forEach((doc)=>{
      const link =  { ...doc.data()};
      link.docId = doc.id;
      links.push(link);
    });
    return links;
  } catch (error) {
    
  }
}

export async function setUserProfilePhoto(uid, file){
  try {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    console.log("imagen subida", resUpload);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

export async function getProfilePhotoUrl(profilePicture){
  try {
    const imageRef = ref(storage, profilePicture);
    console.log(profilePicture);

    const url = await getDownloadURL(imageRef);
    console.log({url});
    return url;

  } catch (error) {
    console.error(error);
  }
}

export async function getUserPublicProfileInfo(uid){
  const profileInfo = await getUserInfo(uid);
  const linksInfo = await getLinks(uid);

  return {
    profileInfo: profileInfo,
    linksInfo: linksInfo,
  };
}


export async function logout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteLink(docId) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await deleteDoc(docRef);

    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateLink(docId, link) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link);

    return res;
  } catch (error) {
    console.error(error);
  }
}
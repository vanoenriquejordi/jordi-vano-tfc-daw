// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
import { getStorage, reff, uploadBytes, getDownloadURL, getBytes, } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc, } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUSCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage =  getStorage(app);

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

  querySnapshot.forEach(doc =>{
    users.push(doc.data())
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
  try{
    const collectionRef = collection(db, "users");
    const docRef = doc(collection, user.uid);
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
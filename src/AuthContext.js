
import firebaseApp, { auth } from './firebase'; 
import firebase from 'firebase/app';
import { database } from './firebase' 
import React, {useContext, useState, useEffect} from 'react';
 
const userContext = React.createContext(); 

export function useAuth (){
    return useContext(userContext); 
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [commentDatabase, setCommentDatabase] = useState()
    const [loading, setLoading] = useState(true)



    

    function addComment(UserAndComment){
    return database.ref('/a').push({UserAndComment}) 
    }

    async function signUp(email, password){
        try {
            await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error);}}
    
        function signOut(){
        return auth.signOut()
        }

  async function login(email, password){
    try {
        // await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        alert(error);}}

    function signOut(){
    return auth.signOut()
    }

    useEffect(()=>{
        const unsubscribe = 
        auth.onAuthStateChanged((user) => {
        setCurrentUser(user)});
        database.ref('/a').on('value', e=>{
        setCommentDatabase(e.val()) ;
        setLoading(false)  
            
    })  
        return unsubscribe
        },[])

    const value= {
        currentUser, 
        setCurrentUser,
        commentDatabase,
        signUp,
        login,
        signOut,
        addComment
    }
    
    return (
        <userContext.Provider value={value}>
            {!loading && children}
        </userContext.Provider>
    )
}

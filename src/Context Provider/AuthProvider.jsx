import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase.config';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const provider = new GoogleAuthProvider()
    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email,password)
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,provider)
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
    }

        useEffect(()=>{
            const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
                
                setUser(currentUser)
                setLoading(false)
                console.log(`User Observed: `,currentUser)
            })
            return ()=> unSubscribe()
        },[])



    const info = {
        user,
        setUser,
        setLoading,
        createUser,
        signInUser,
        googleSignIn,
        logOut
    }

    return <AuthContext.Provider value={info}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;
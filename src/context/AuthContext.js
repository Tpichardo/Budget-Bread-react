import { useContext, createContext, useState, useEffect } from "react";
import { auth } from '../util/firebaseConfig.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";



const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });


    }, []);


    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };


    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOut = () => {

    }

    const forgotPassword = (email) => {

    }



    const contextValue = {
        currentUser,
        signUp,
        signIn,
        signOut,
        forgotPassword
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
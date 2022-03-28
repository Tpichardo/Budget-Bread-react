import { useContext, createContext, useState, useEffect } from "react";
import { auth } from '../util/firebaseConfig.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
}

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null)
            }
        })


    }, []);


    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };


    const signIn = (email, password) => {

    }

    const signOut = () => {

    }

    const forgotPassword = (email) => {

    }



    const contextValue = {
        user,
        signUp,
        signIn,
        signOut,
        forgotPassword
    };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
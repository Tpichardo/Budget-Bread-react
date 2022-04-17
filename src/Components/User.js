import React from 'react';
import { useAuth } from '../context/AuthContext.js';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const User = () => {
    const { logOut, currentUser } = useAuth();
    const history = useHistory();

    const handleSignOut = async () => {
        try {
            await logOut();
            history.push('/signin')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h1>hey {currentUser?.displayName}</h1>
            <h1>hey {currentUser?.email}</h1>
            <Button onClick={handleSignOut}>Sign Out</Button>


        </div>
    )
}

export default User;
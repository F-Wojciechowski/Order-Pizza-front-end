import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {logOut} from "../../features/UserData/userDataSlice";


export const LogOut = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const loggingOut = async () => {
            const response = await fetch(`http://localhost:3001/logout`, {
                credentials: 'include',
                method: "POST"
            })
        }
        loggingOut();
        dispatch(logOut())
    }, [])
    return <p>successfully logged out</p>
}
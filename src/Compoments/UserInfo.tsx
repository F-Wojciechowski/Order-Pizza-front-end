import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {ChechLoginAsync, selectUserData} from "../features/UserData/userDataSlice";
import {useNavigate} from "react-router-dom";

export const UserInfo = () => {
    const {name, isLogIn} = useAppSelector(selectUserData);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(ChechLoginAsync())
        if (!isLogIn) {
            navigate('/login')
        }
    }, [isLogIn])
    return (
        <>
            <h1>Hello {name}</h1>
        </>
    )
}
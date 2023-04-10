import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Spiner from "./Common/Spiner";
import {useAppSelector} from "../app/hooks";
import {selectUserData} from "../features/UserData/userDataSlice";

export const OrderSumary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {isLogIn} = useAppSelector(selectUserData);
    useEffect(() => {
        if (!location.state && !isLogIn) {
            setTimeout(() => {
                navigate("/login", {state: "order"})
            }, 500)
        }
    }, [])
    return (
        <p>{location.state ? <> Order with id {location.state} has been placed</> : <Spiner/>}</p>
    )
}
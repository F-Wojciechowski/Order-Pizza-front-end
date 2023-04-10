import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {ExempleLOgin} from "./Compoments/ExempleLogin";
import {useAppSelector} from "./app/hooks";
import {selectUserData} from "./features/UserData/userDataSlice";
import {ResponsiveAppBar} from "./Compoments/ResponsiveAppBar"
import {UserInfo} from "./Compoments/UserInfo";
import Spiner from "./Compoments/Common/Spiner";
import {Order} from "./Compoments/Order";
import {OrderSumary} from "./Compoments/OrderSumary";
import {MyOrders} from "./Compoments/MyOrders";
import {OneOrder} from "./Compoments/Common/OneOrder";
import {Register} from "./Compoments/Register";
import {LogOut} from "./Compoments/Common/Logut";

function App() {
    const {isLogIn} = useAppSelector(selectUserData);
    const linksArray = ['Order', 'login', 'user', 'My Orders']
    const filtredLinksArray = [...linksArray.filter(el => el != 'login'), 'logout']
    return (
        <>
            <ResponsiveAppBar links={isLogIn ? filtredLinksArray : linksArray}/>
            <Routes>
                <Route path={"/login"} element={<ExempleLOgin/>}/>
                <Route path={"/user"} element={<UserInfo/>}/>
                <Route path={"/spiner"} element={<Spiner/>}/>
                <Route path={"/Order"} element={<Order/>}/>
                <Route path={"/ordersumary"} element={<OrderSumary/>}/>
                <Route path={"/My Orders"} element={<MyOrders/>}/>
                <Route path={"/My Orders/:id"} element={<OneOrder/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/logout"} element={<LogOut/>}/>
            </Routes>
        </>
    );
}

export default App;

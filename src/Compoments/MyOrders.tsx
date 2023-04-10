import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import {useAppSelector} from "../app/hooks";
import {selectUserData} from "../features/UserData/userDataSlice";

interface Orders {
    id: string
}

export const MyOrders = () => {
    const {isLogIn} = useAppSelector(selectUserData);
    const [orders, setOrders] = useState<Orders[]>([]);
    const navigate = useNavigate()
    const fetchOrders = async () => {
        const response = await fetch("http://localhost:3001/orders", {
            credentials: 'include',
            method: "GET"
        })
        const data = await response.json()
        setOrders(() => data)
    }
    useEffect(() => {
        if (!isLogIn) {
            navigate('/login');
            return
        }
        fetchOrders()
    }, [])


    return (<>
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto'}}>

            <nav aria-label="secondary mailbox folders">
                <div style={{textAlign: 'center'}}>
                    Your orders
                </div>
                <List>
                    {orders ? orders.map(item => <ListItem key={item.id} disablePadding><ListItemButton> <Link
                        to={`/My%20Orders/${item.id}`}><ListItemText
                        primary={item.id}/></Link></ListItemButton></ListItem>) : null}
                </List>
            </nav>
        </Box>
    </>)

}
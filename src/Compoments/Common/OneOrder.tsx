import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectUserData} from "../../features/UserData/userDataSlice";

interface OneOrderArrau {
    adress: string;
    name: string;
}

export const OneOrder = () => {

    const {id} = useParams();
    const [orderedPizzas, setOrderredPizzas] = useState<string[]>([]);
    const [adress, setAdress] = useState('');
    const {isLogIn} = useAppSelector(selectUserData);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogIn) {
            navigate('/login')
        }
        const fetchOrder = async () => {
            const response = await fetch(`http://localhost:3001/orders/${id}`, {
                credentials: 'include',
                method: "GET"
            })
            const data = await response.json() as OneOrderArrau[];
            setAdress(data[0].adress);
            if (orderedPizzas.length == 0) {
                setOrderredPizzas([])
                data.map(data => setOrderredPizzas(orderedPizzas => [...orderedPizzas, data.name]));
            }
        }
        fetchOrder();
    }, [])

    return <p>Ordered pizzas: {orderedPizzas.map(i => `${i} `)} to the address: {adress}</p>
}
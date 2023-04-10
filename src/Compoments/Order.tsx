import React, {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    Button,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemButton, ListItemIcon, ListItemText,
    Select,
    SelectChangeEvent
} from "@mui/material";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectUserData} from "../features/UserData/userDataSlice";

interface Pizzas {
    name: string,
    id: string,
    price: string
}


export const Order = () => {
    const [basket, setBasket] = useState<Pizzas[] | []>([]);
    const [currentPizza, setCurrentPizza] = useState<string>("");
    const [adress, setAdress] = useState<string>("")
    const [pizzas, setPizzas] = useState<Pizzas[] | []>([]);
    const [orederTotal, setOrderTotal] = useState<number | null>();
    const [orderSend, setOrderSend] = useState(false);
    const [orderid, setOrderID] = useState<string | null>();
    const navigate = useNavigate();
    const {isLogIn} = useAppSelector(selectUserData);
    const dispatch = useAppDispatch();
    useEffect(() => {
            const fetchPizza = async () => {
                ;
                if (!isLogIn) {
                    navigate('/login')
                    return
                }
                const data = await fetch("http://localhost:3001/pizzas", {credentials: "include"});
                const response = await data.json();
                setPizzas(response)
            }
            fetchPizza();
            if (orderSend) {
                navigate("/ordersumary", {state: orderid})
            }
        }, [orderSend]
    )

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setCurrentPizza(e.target.value)
    }

    const handeSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (currentPizza == "") {
            setCurrentPizza(pizzas[0].id)
            setOrderTotal(Number(pizzas[0].price))
        } else {
            const summary = basket.map(el => Number(el.price));
            setOrderTotal(summary.reduce((prev, acc) => prev + acc))
        }
    }
    const handeleOrder = async () => {
        const pizzasIdToorrder = basket.map(el => el.id)
        const data = await fetch("http://localhost:3001/order", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pizzas: pizzasIdToorrder,
                adress
            })
        })
        const response = await data.json();
        console.log(response)
        setOrderSend(true);
        setOrderID(response);
    }
    const policz = () => {
        console.log(pizzas.filter(pi => pi.id == currentPizza)[0].price)
    }
    const arrayOfPizza = [{name: "Kebab", price: 29.99}, {name: "Margaritha", price: 19.99}, {
        name: "Parma",
        price: 29.99
    }]
    const addToBasket = (item: string) => {
        const [pizzaName] = pizzas.filter(pizza => pizza.id == item);
        console.log(pizzaName);
        setBasket([...basket, pizzaName]);
        setOrderTotal(null)
    };
    const removeFromBasekt = (index: number) => {
        setBasket(basket => {
            return basket.filter((item, currenIndex) => currenIndex !== index)
        });
        setOrderTotal(null)
    }
    return (
        <>
            <div><Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto'}}>

                <FormControl style={{margin: '50px'}}>
                    <br/>
                    <InputLabel id="demo-simple-select-label">Pizza</InputLabel>
                    <Select
                        labelId="pizzas"
                        id="pizzas"
                        value={currentPizza}
                        label="Age"
                        onChange={(e) => handleChange(e)}
                    >
                        {
                            pizzas.length == 0 ? null : pizzas.map(pizza => <MenuItem id={pizza.name} value={pizza.id}
                                                                                      key={pizza.id}>{pizza.name} {pizza.price}zł</MenuItem>)
                        }

                    </Select>
                    <TextField value={adress} onChange={(e) => setAdress(e.target.value)} id="outlined-basic"
                               label="Adress" variant="outlined"/>
                    <Button onClick={() => addToBasket(currentPizza)} variant="contained"
                            endIcon={<AddShoppingCartIcon/>}>
                        Add to basket
                    </Button>
                </FormControl>
                {basket.length > 0 ?
                    <nav aria-label="secondary mailbox folders">
                        <div style={{textAlign: 'center'}}>Basket</div>
                        <List>
                            {basket.map((item, index) =>
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={item.name}/>
                                        <ListItemIcon>
                                            <DeleteForeverIcon onClick={() => removeFromBasekt(index)}/>
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>)}
                            <Button
                                onClick={(e) => {
                                    handeSubmit(e)
                                }}
                                type="submit"
                                variant="contained"
                            >
                                Summary
                            </Button>
                            {orederTotal && <><p>To pay {orederTotal} zł</p><Button variant="contained"
                                                                                    onClick={() => handeleOrder()}>Submit
                                your order</Button></>}
                        </List>
                    </nav>
                    : null}
            </Box>
            </div>

        </>
    )
}
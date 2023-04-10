import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "../app/hooks";
import {ChechLoginAsync} from "../features/UserData/userDataSlice";
import {Link, useLocation, useNavigate} from "react-router-dom";

interface User {
    email: string,
    password: string,
    name: string
}


const theme = createTheme();

export function Register() {
    const dispatch = useAppDispatch();
    const [usserRegisterd, setuUserRegisterd] = useState<boolean | null>(null)
    const [user, setUser] = useState<User>({email: "", password: "", name: ""})
    useEffect(() => {
        dispatch(ChechLoginAsync())

    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUser(state => ({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const responseFromApi = await fetch("http://localhost:3001/register", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const jsonResponse = await responseFromApi.json();
        setuUserRegisterd(jsonResponse.usserRegisterd)
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            value={user.email}
                            onChange={(e) => handleChange(e)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            value={user.name}
                            onChange={(e) => handleChange(e)}
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="name"
                            id="name"
                            autoComplete="current-name"
                        />
                        <TextField
                            value={user.password}
                            onChange={(e) => handleChange(e)}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
                {usserRegisterd === true && <p>User successfully restored<Link to={"/login"}>Log In</Link></p>}
                {usserRegisterd === false && <h1>an error occurred, please try again later</h1>}
            </Container>
        </ThemeProvider>
    );
}
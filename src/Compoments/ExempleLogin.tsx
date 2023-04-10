import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {ChechLoginAsync, logIn, selectUserData} from "../features/UserData/userDataSlice";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Spiner from './Common/Spiner';

interface User {
    email: string,
    password: string
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export function ExempleLOgin() {
    const location = useLocation();
    const {isLogIn, status} = useAppSelector(selectUserData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [worndCredential, setWrongCredential] = useState<boolean>(false)
    const [user, setUser] = useState<User>({email: "", password: ""})
    useEffect(() => {
        dispatch(ChechLoginAsync())
        if (isLogIn) {
            if (location.state == "order") {
                navigate("/home")
            } else navigate("/user")

        }
    }, [isLogIn, status])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUser(state => ({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const responseFromApi = await fetch("http://localhost:3001/login", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const responseObject = await responseFromApi.json()
        if (responseObject.isLogIn) {
            dispatch(logIn(responseObject.isLogIn))
            setWrongCredential(false)
        } else {
            setWrongCredential(true);
            setUser({email: "", password: ""})
        }
    };
    return (
        <ThemeProvider theme={theme}>
            {status != "idle" ? <Spiner/> : null}
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
                        Log in
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
                            Log In
                        </Button>
                        <Grid container>

                            <Grid item>
                                {/*<Link href="#" variant="body2">*/}
                                {/*    {"Don't have an account? Sign Up"}*/}
                                {/*</Link>*/}
                                <Link to={'/register'}> Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {worndCredential ? <p>Wrong passowrd or email</p> : null}
        </ThemeProvider>
    );
}
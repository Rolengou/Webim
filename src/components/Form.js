import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import {Redirect} from "react-router-dom";
import {Avatar,} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "500px",
        boxShadow: '0px 0px 8px 0px rgba(34, 60, 80, 0.2)',
    },
    typography: {
        marginTop: "10px"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginBottom: "20px"
    },
    icon: {
        marginTop: "20px",
        backgroundColor: "green"
    },
    wrongCred: {
        display: "block",
        color: "red"
    }
}));

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Поле Логин обязательно для заполнения"),
    password: yup
        .string()
        .required("Поле Пароль обязательно для заполнения")
})

export const SignIn = () => {
    const classes = useStyles();
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const baseUrl = 'https://emphasoft-test-assignment.herokuapp.com'

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
        console.log(username)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = (data, e) => {
        e.preventDefault()
        axios
            .post(baseUrl + '/api-token-auth/', {username, password})
            .then((res) => {
                localStorage.setItem('token', res.data.token)

                if (res.request.status === 200) {
                    setRedirect(true)
                }
            })
            .catch((err) => {
                console.log(err.message)
                setWrong(true)
        })
    }

    if (redirect) {
        return <Redirect to='/users' />
    }

    if (localStorage.getItem('token')) {
        return <Redirect to='/users' />
    }


    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.icon}>
                    <LockIcon />
                </Avatar>
                <Typography className={classes.typography} component="h1" variant="h5">
                    Войти в IT
                </Typography>
                <form className={classes.form} noValidate
                      onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={register}
                        id="username"
                        label="Логин"
                        name="username"
                        autoFocus
                        onChange={onChangeUsername}
                        value={username}
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                        autoComplete="username"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputRef={register}
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangePassword}
                        value={password}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Вход
                    </Button>
                </form>
                {wrong === true &&
                <p className={classes.wrongCred}>Неверный логин или пароль</p>}
            </div>
        </Container>
    );
}
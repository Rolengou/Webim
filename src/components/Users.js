import axios from "axios";
import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from "react-router-dom";
import {DataGrid} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import swal from "sweetalert";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Username is a required field")
        .max(150)
        .matches(/^[\w.@+-]+$/, "Username can contain numbers, letters or @/./+/-/_ only "),
    password: yup
        .string()
        .required("Password is a required field")
        .max(128)
        .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, "Password must be at least 8 characters, including a number, an uppercase letter, and a lowercase letter"),
    firstname: yup
        .string()
        .required("Firstname is a required field")
        .max(30),
    lastname: yup
        .string()
        .required("Lastname is a required field")
        .max(150),
})

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        minWidth: "1000px",
        maxWidth: "1200px",
        margin: "0 auto",
        height: "800px"
    },
    menuButton: {
        marginRight: "0",
    },
    title: {
        flexGrow: 1,
        marginLeft: "-20px"
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        marginTop: "0px"
    },
}));

export const Users = () => {
    const classes = useStyles();
    const [datas, setDatas] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [newSelection, setNewSelection] = useState('')
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    })
    const {register: register2, errors: errors2, handleSubmit: handleSubmit2} = useForm({
        resolver: yupResolver(schema)
    });
    const baseUrl = 'https://emphasoft-test-assignment.herokuapp.com'
    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.6 },
        {field: 'username', headerName: 'Username', flex: 1},
        {field: 'first_name', headerName: 'Firstname', flex: 1},
        {field: 'last_name', headerName: 'Lastname', flex: 1},
        {field: 'is_active', headerName: 'Is active', flex: 1},
        {field: 'last_login', headerName: 'Last login', flex: 1},
        {field: 'is_superuser', headerName: 'Is superuser', flex: 1},
        {
            field: '',
            renderCell: () => (
                <strong>
                    <Button
                        align="left"
                        color="primary"
                        size="small"
                        onClick={handleClickOpenEdit}
                    >
                        <EditIcon />

                    </Button>
                    <Button align="left"
                            color="primary"
                            size="small"
                            onClick={handleDeleteUser}
                    >
                        <DeleteIcon />
                    </Button>
                </strong>
            ), flex: 1
        },

    ]

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        axios
            .get(baseUrl + '/api/v1/users/', config)
            .then((res) => {
                setDatas(res.data)
            })
    }, [])

    const updateData = () => {
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        axios
            .get(baseUrl + '/api/v1/users/', config)
            .then((res) => {
                setDatas(res.data)
            })
    }

    const handleDeleteUser = (e) => {
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        e.preventDefault()
        swal({
            title: "Are you sure?",
            buttons: [true, "Do it!"],
        }).then((res) => {
            if (res) {
                axios
                    .delete(baseUrl + '/api/v1/users/' + `${newSelection}/`, config)
                    .then(() => {
                        updateData()
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            }
        })
    }

    const handleExit = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        setRedirect(true)
    }


    // EditPopup
    const handleClickOpenEdit = () => {
        setOpenEdit(true)
    };

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const onSubmitEdit = (data, e) => {
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        e.preventDefault()
        setIsActive(true)
        axios
            .patch(baseUrl + '/api/v1/users/' + `${newSelection}/`, {username: data.username, first_name: data.firstname, last_name: data.lastname, password:data.password, is_active: isActive}, config)
            .then((res) => {
                swal({
                    icon: "success",
                    title: "The user is updated!"
                })
                updateData()
            })
            .then(() => {
                setOpenEdit(false)
            })

            .catch((err) => {
                console.log(err.message)
            })
    }
    //End

    //Add Popup
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = (data, e) => {
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        e.preventDefault()
        setIsActive(true)
        axios
            .post(baseUrl + '/api/v1/users/', {username: data.username, password: data.password, first_name: data.firstname, last_name: data.lastname, is_active: isActive}, config)
            .then((res) => {
                swal({
                    icon: "success",
                    title: "The user is created!"
                })
                updateData()
            })
            .then(() => {
                setOpen(false)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    //End

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <div className={classes.tableContainer}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Awesome Table!
                    </Typography>
                    <Button color="inherit" onClick={handleClickOpen}>
                       + Add user
                    </Button>
                    <Button onClick={handleExit} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>

            {/*Add popup*/}

            <Dialog open={open} onClose={onSubmit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New user</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate
                          onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // autoComplete="firstname"
                                    name="firstname"
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                    inputRef={register}
                                    error={!!errors.firstname}
                                    helperText={errors?.firstname?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    // autoComplete="lastname"
                                    inputRef={register}
                                    error={!!errors.lastname}
                                    helperText={errors?.lastname?.message}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    // autoComplete="username"
                                    inputRef={register}
                                    error={!!errors.username}
                                    helperText={errors?.username?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    inputRef={register}
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add
                        </Button>
                        <Button onClick={handleClose}
                                color="primary"
                                variant="contained"
                                fullWidth
                                className={classes.cancel}
                        >
                            Cancel
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/*DataGrid*/}

            <DataGrid
                      rows={datas}
                      columns={columns}
                      pageSize={10}

                      onSelectionModelChange={(res) => {
                          setNewSelection(res.selectionModel[0])
                      }}
            />

             {/*Edit popup*/}

            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit user with ID {newSelection}</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate
                          onSubmit={handleSubmit2(onSubmitEdit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // autoComplete="firstname"
                                    //defaultValue={firstname}
                                    name="firstname"
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                    inputRef={register2}
                                    error={!!errors2.firstname}
                                    helperText={errors2?.firstname?.message}
                                    // onChange={onChangeFirstnameEdit}
                                    // value={firstname}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    //defaultValue={lastname}
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    // autoComplete="lastname"
                                    inputRef={register2}
                                    error={!!errors2.lastname}
                                    helperText={errors2?.lastname?.message}
                                    // onChange={onChangeLastnameEdit}
                                    // value={lastname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    //defaultValue={username}
                                    id="username"
                                    label="Username"
                                    name="username"
                                    // autoComplete="username"
                                    inputRef={register2}
                                    //value={username}
                                    error={!!errors2.username}
                                    helperText={errors2?.username?.message}
                                    //onChange={onChangeUsernameEdit}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    //required
                                    fullWidth
                                    //defaultValue={password}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    inputRef={register2}
                                    error={!!errors2.password}
                                    helperText={errors2?.password?.message}
                                    // onChange={onChangePasswordEdit}
                                    // value={password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Done
                        </Button>
                        <Button onClick={handleCloseEdit}
                                color="primary"
                                variant="contained"
                                fullWidth
                                className={classes.cancel}
                        >
                            Cancel
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

import React, {useEffect, useState} from 'react'
import axios from "axios";
import {
    Table, TableContainer, TableHead,
    TableCell, TableSortLabel, TableBody,
    TableRow, Button, AppBar, DialogActions,
    IconButton, makeStyles, Toolbar, TextField,
    Paper, InputBase, DialogTitle, Dialog, DialogContent,
} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import Typography from "@material-ui/core/Typography";
import swal from "sweetalert";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Redirect} from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
    app: {
        minWidth: "600px",
        maxWidth: "1000px",
        margin: "0 auto",
        height: "1000px",
        boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        marginTop: "0px"
    },
    iconEdit:{
        cursor: 'pointer'
    },
    iconDelete: {
        color: "red",
        cursor: 'pointer',
    },
    arrow: {
        position: "absolute",
        marginLeft: "100%"
    },
    inputMaterial:{
        width: '100%'
    },
    menuButton: {
        marginRight: "0",
    },
    title: {
        flexGrow: 1,
        marginLeft: "-20px"
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 200,
        marginRight: 10,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },

}));
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

export const DataTable = () => {
    const styles= useStyles();
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [sortDir, setSortDir] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedRow, setSelectedRow] = useState([])
    const [selectedRowData, setSelectedRowData] = useState('')
    const [openDelete, setOpenDelete] = useState(false)
    const [fieldData, setFieldData] = useState('')
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    })
    const {register: register2, errors: errors2, handleSubmit: handleSubmit2} = useForm({
        resolver: yupResolver(schema)
    })
    const baseUrl = 'https://emphasoft-test-assignment.herokuapp.com'

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        axios
            .get(baseUrl + '/api/v1/users/', config)
            .then((res) => {
                setData(res.data)
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
                setData(res.data)
            })
    }
    const handleExit = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        setRedirect(true)
    }
    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    //Start sorting stuff
    const sortData = (field) => {
        const copyData = [...data]
        let sortData
        if (sortDir) {
            sortData = copyData.sort(
                (a, b) => {return a[field].toString().toLowerCase()
                > b[field].toString().toLowerCase() ? 1 : -1}
            )
        } sortData = copyData.reverse(
            (a, b) => {return a[field].toString().toLowerCase()
            > b[field].toString().toLowerCase() ? 1 : -1}
        )
        setData(sortData)
        setSortDir(!sortDir)
    }
    const Arrow = () => {
        return (
            sortDir ? <ArrowDropDownIcon className={styles.arrow}/> : <ArrowDropUpIcon className={styles.arrow}/>
        )
    }
    const fieldSortData = (field) => {
        sortData(field)
        setFieldData(field)
    }
    // End sorting stuff

    //Add popup
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
    //End add popup

    //Edit popup
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
            .patch(baseUrl + '/api/v1/users/' + `${selectedRow}/`, {username: data.username, first_name: data.firstname, last_name: data.lastname, password:data.password, is_active: isActive}, config)
            .then((res) => {
                swal({
                    icon: "success",
                    title: "The user is updated!"
                })
                setFieldData('')
                updateData()
            })
            .then(() => {
                setOpenEdit(false)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    //End edit popup

    //Delete popup
    const handleOpenDelete = () => {
        setOpenDelete(true)
    }
    const handleCloseDelete = () => {
        setOpenDelete(false)
    }
    const handleDeleteUser = (e) => {
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        e.preventDefault()
        axios
            .delete(baseUrl + '/api/v1/users/' + `${selectedRow}/`, config)
            .then((res) => {
                setOpenDelete(false)
                swal({
                    icon: "success",
                    title: "The user is deleted!"
                })
                setFieldData('')
                updateData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    //End delete popup

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <div className={styles.app}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                                className={styles.menuButton}
                                color="inherit"
                                aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        Awesome Table!
                    </Typography>
                    <Paper component="form" className={styles.root}>
                        <InputBase
                            className={styles.input}
                            placeholder="Type username"
                            inputProps={{'aria-label': 'search here'}}
                            onChange={handleChangeSearch}
                        />
                    </Paper>
                    <Button color="inherit" onClick={handleClickOpen}>
                        + Add user
                    </Button>
                    <Button color="inherit" onClick={handleExit}>Logout</Button>
                </Toolbar>
            </AppBar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow selected={true}>
                            <TableCell onClick={() => {
                                fieldSortData('id')
                            }}>
                                <TableSortLabel hideSortIcon={true}>
                                    ID{fieldData === "id" ? <Arrow/> : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell onClick={() => {
                                fieldSortData('username')
                            }}>
                                <TableSortLabel hideSortIcon={true}>
                                    Username{fieldData === "username" ? <Arrow/> : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell onClick={() => {
                                fieldSortData('first_name')
                            }}>
                                <TableSortLabel hideSortIcon={true}>
                                    Firstname{fieldData === "first_name" ? <Arrow/> : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell onClick={() => {
                                fieldSortData('last_name')
                            }}>
                                <TableSortLabel hideSortIcon={true}>
                                    Lastname{fieldData === "last_name" ? <Arrow/> : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell onClick={() => {
                                fieldSortData('is_active')
                            }}>
                                <TableSortLabel hideSortIcon={true}>
                                    Is active{fieldData === "is_active" ? <Arrow/> : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell onClick={() => {
                                fieldSortData('is_superuser')
                            }}>
                                <TableSortLabel hideSortIcon={true}>
                                    Is superuser{fieldData === "is_superuser" ? <Arrow/> : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((val) => {
                                if (searchTerm === '') {
                                    return val
                                } else if (val.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val
                                }
                            })
                            .map((item) => (
                                <TableRow onClick={() => {
                                    setSelectedRow(item.id)
                                    setSelectedRowData(item)
                                }} key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.first_name}</TableCell>
                                    <TableCell>{item.last_name}</TableCell>
                                    <TableCell>{item.is_active + ''}</TableCell>
                                    <TableCell>{item.is_superuser + ''}</TableCell>
                                    <TableCell>
                                        <Button
                                            style={{maxWidth: '30px', minWidth: '30px'}}
                                            size="small">
                                            <Edit
                                                color="primary"
                                                onClick={handleClickOpenEdit}
                                                className={styles.iconEdit}/>
                                        </Button>
                                        <Button
                                            style={{maxWidth: '30px', minWidth: '30px'}}
                                            size="small"><Delete
                                            onClick={handleOpenDelete}
                                            className={styles.iconDelete}/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*Add popup*/}
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New user</DialogTitle>
                <DialogContent>
                    <form className={styles.form} noValidate
                          onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstname"
                                    variant="outlined"
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
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    inputRef={register}
                                    error={!!errors.lastname}
                                    helperText={errors?.lastname?.message}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    inputRef={register}
                                    error={!!errors.username}
                                    helperText={errors?.username?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
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
                            className={styles.submit}
                        >
                            Add
                        </Button>
                        <Button onClick={handleClose}
                                color="primary"
                                variant="contained"
                                fullWidth
                                className={styles.cancel}
                        >
                            Cancel
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            {/*End add popup*/}

            {/*Start edit popup */}
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit user with ID {selectedRow}</DialogTitle>
                <DialogContent>
                    <form className={styles.form} noValidate
                          onSubmit={handleSubmit2(onSubmitEdit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    defaultValue={selectedRowData.first_name}
                                    name="firstname"
                                    variant="outlined"
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                    inputRef={register2}
                                    error={!!errors2.firstname}
                                    helperText={errors2?.firstname?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={selectedRowData.last_name}
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    inputRef={register2}
                                    error={!!errors2.lastname}
                                    helperText={errors2?.lastname?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={selectedRowData.username}
                                    id="username"
                                    label="Username"
                                    name="username"
                                    inputRef={register2}
                                    error={!!errors2.username}
                                    helperText={errors2?.username?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    inputRef={register2}
                                    error={!!errors2.password}
                                    helperText={errors2?.password?.message}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                        >
                            Done
                        </Button>
                        <Button onClick={handleCloseEdit}
                                color="primary"
                                variant="contained"
                                fullWidth
                                className={styles.cancel}
                        >
                            Cancel
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            {/* End edit popup*/}

            {/*Delete popup*/}
            <Dialog
                open={openDelete}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Delete ID {selectedRow}?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary"
                            variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteUser} color="primary"
                            variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/*End delete popup*/}

        </div>
    );
}


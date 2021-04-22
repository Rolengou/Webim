import React, {useEffect, useState} from 'react'
import axios from "axios";
import {makeStyles} from '@material-ui/core';
import swal from "sweetalert";
import * as yup from "yup";
import {Redirect} from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {AppHeader} from "./AppHeader";
import {DataTables} from "./DataTable";
import {AddUserPopup} from "./AddUserPopup";
import {EditUserPopup} from "./EditUserPopup";
import {DeleteUserPopup} from "./DeleteUserPopup";

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

export const Main = () => {
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
    const handleExit = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        setRedirect(true)
    }
    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value)
    }
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
    const chooseArrow = () => {
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
            <AppHeader styles={styles}
                       handleExit={handleExit}
                       handleClickOpen={handleClickOpen}
                       handleChangeSearch={handleChangeSearch}
            />
            <DataTables styles={styles}
                        chooseArrow={chooseArrow}
                        fieldSortData={fieldSortData}
                        fieldData={fieldData}
                        data={data}
                        searchTerm={searchTerm}
                        setSelectedRow={setSelectedRow}
                        setSelectedRowData={setSelectedRowData}
                        handleClickOpenEdit={handleClickOpenEdit}
                        handleOpenDelete={handleOpenDelete}
            />

            {/*Add popup*/}
            <AddUserPopup handleClose={handleClose}
                          styles={styles}
                          onSubmit={onSubmit}
                          schema={schema}
                          open={open}
            />
            {/*End add popup*/}

            {/*Start edit popup */}
            <EditUserPopup styles={styles}
                           openEdit={openEdit}
                           handleCloseEdit={handleCloseEdit}
                           selectedRow={selectedRow}
                           schema={schema}
                           onSubmitEdit={onSubmitEdit}
                           selectedRowData={selectedRowData}
            />
            {/* End edit popup*/}

            {/*Delete popup*/}
            <DeleteUserPopup openDelete={openDelete}
                             selectedRow={selectedRow}
                             handleCloseDelete={handleCloseDelete}
                             handleDeleteUser={handleDeleteUser}
            />
            {/*End delete popup*/}
        </div>
    );
}


import * as React from 'react';
import axios from "axios";
import {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    tableContainer: {
        maxWidth: "500px",
        margin: "0 auto"
    },
    table: {
        width: "auto",
        tableLayout: "auto",
        margin: "0 auto",
        boxShadow: '0px 0px 8px 0px rgba(34, 60, 80, 0.2)',
        marginBottom: "30px",

    },
    button: {
        left: "50%",
        transform: "translateX(-50%)",
        margin: "20px 0px"
    },
    idButton: {
        paddingRight: "15px"
    },
    idTableCell: {
        padding: "0"
    }
});

export const Users = () => {
    const classes = useStyles();
    const [data, setData] = useState([])
    const baseUrl = 'http://emphasoft-test-assignment.herokuapp.com'
    const handleSubmit = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token')
            }
        }
        axios
            .get(baseUrl + '/api/v1/users/', config)
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
    }

    const sortId = () => {
        const dataCopy = [...data]
        dataCopy.sort(function (a,b) {
            return a.id - b.id
        })
        setData(dataCopy)
    }

    const sortName = () => {
        const dataCopy = [...data]
        dataCopy.sort(function (a,b) {
            let nameA = a.username.toLowerCase()
            let nameB = b.username.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
        setData(dataCopy)
    }

    return (
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>
                   Get users
                </Button>
                <Table className={classes.table}  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.idTableCell} onClick={sortId}><Button className={classes.idButton} color="primary">ID</Button></TableCell>
                            <TableCell onClick={sortName} align="left"><Button color="primary">Username</Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell component="th" scope="row">
                                    {e.id}
                                </TableCell>
                                <TableCell align="left">{e.username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}
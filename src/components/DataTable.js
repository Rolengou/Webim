import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import React from "react";


export const DataTables = (props) => {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow selected={true}>
                        <TableCell style={{width: "10%"}} onClick={() => {
                            props.fieldSortData('id')
                        }}>
                            <TableSortLabel hideSortIcon={true}>
                                ID{props.fieldData === "id" ? props.chooseArrow : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{width: "15%"}} onClick={() => {
                            props.fieldSortData('username')
                        }}>
                            <TableSortLabel hideSortIcon={true}>
                                Username{props.fieldData === "username" ? props.chooseArrow : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{width: "15%"}} onClick={() => {
                            props.fieldSortData('first_name')
                        }}>
                            <TableSortLabel hideSortIcon={true}>
                                Firstname{props.fieldData === "first_name" ? props.chooseArrow : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{width: "15%"}} onClick={() => {
                            props.fieldSortData('last_name')
                        }}>
                            <TableSortLabel hideSortIcon={true}>
                                Lastname{props.fieldData === "last_name" ? props.chooseArrow : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{width: "15%"}} onClick={() => {
                            props.fieldSortData('is_active')
                        }}>
                            <TableSortLabel hideSortIcon={true}>
                                Is active{props.fieldData === "is_active" ? props.chooseArrow : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{width: "15%"}} onClick={() => {
                            props.fieldSortData('is_superuser')
                        }}>
                            <TableSortLabel hideSortIcon={true}>
                                Is superuser{props.fieldData === "is_superuser" ? props.chooseArrow : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data
                        .filter((val) => {
                            if (props.searchTerm === '') {
                                return val
                            } else if (val.username.toLowerCase().includes(props.searchTerm.toLowerCase())) {
                                return val
                            }
                        })
                        .map((item) => (
                            <TableRow onClick={() => {
                                props.setSelectedRow(item.id)
                                props.setSelectedRowData(item)
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
                                            onClick={props.handleClickOpenEdit}
                                            className={props.styles.iconEdit}/>
                                    </Button>
                                    <Button
                                        style={{maxWidth: '30px', minWidth: '30px'}}
                                        size="small"><Delete
                                        onClick={props.handleOpenDelete}
                                        className={props.styles.iconDelete}/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
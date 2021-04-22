import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


export const EditUserPopup = (props) => {
    const {register: register2, errors: errors2, handleSubmit: handleSubmit2} = useForm({
        resolver: yupResolver(props.schema)
    })
    return (
        <Dialog open={props.openEdit} onClose={props.handleCloseEdit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit user with ID {props.selectedRow}</DialogTitle>
            <DialogContent>
                <form className={props.styles.form} noValidate
                      onSubmit={handleSubmit2(props.onSubmitEdit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                defaultValue={props.selectedRowData.first_name}
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
                                defaultValue={props.selectedRowData.last_name}
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
                                defaultValue={props.selectedRowData.username}
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
                        className={props.styles.submit}
                    >
                        Done
                    </Button>
                    <Button onClick={props.handleCloseEdit}
                            color="primary"
                            variant="contained"
                            fullWidth
                            className={props.styles.cancel}
                    >
                        Cancel
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
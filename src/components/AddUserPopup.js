import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const AddUserPopup = (props) => {
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(props.schema),
    })
    return (
        <Dialog open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New user</DialogTitle>
            <DialogContent>
                <form className={props.styles.form} noValidate
                      onSubmit={handleSubmit(props.onSubmit)}>
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
                        className={props.styles.submit}
                    >
                        Add
                    </Button>
                    <Button onClick={props.handleClose}
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
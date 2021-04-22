import {AppBar, Button, IconButton, InputBase, Paper, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const AppHeader = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start"
                            className={props.styles.menuButton}
                            color="inherit"
                            aria-label="menu">
                </IconButton>
                <Typography variant="h6" className={props.styles.title}>
                    Awesome Table!
                </Typography>
                <Paper component="form" className={props.styles.root}>
                    <InputBase
                        className={props.styles.input}
                        placeholder="Type username"
                        inputProps={{'aria-label': 'search here'}}
                        onChange={props.handleChangeSearch}
                    />
                </Paper>
                <Button color="inherit" onClick={props.handleClickOpen}>
                    + Add user
                </Button>
                <Button color="inherit" onClick={props.handleExit}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}
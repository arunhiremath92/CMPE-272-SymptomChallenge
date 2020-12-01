import React, { Component } from 'react';
import './App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import { Avatar, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, makeStyles, MenuItem, NativeSelect, Select, Tooltip } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));
const statesCustomConfig = () => {
    return {
        "NJ": {
            fill: "navy",
            clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
        },
        "NY": {
            fill: "#CC0000"
        },
        "CA": {
            fill: '#9400D3',
            clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
        },
    };
};
let HomeDashBoard = () => {


    const mapHandler = (event) => {
        setStateName(20);
        setCardVisibility(false);
    };

    const handleStateSelection = (event) => {
        setStateName(event.target.value);
        setCardVisibility(false)
    };

    const handleCountyNameSelection = (event) => {
        setCounty(event.target.value);
        setCardVisibility(true)
    };
    const classes = useStyles();

    let [stateName, setStateName] = React.useState(0)
    let [county, setCounty] = React.useState(0)
    let [tier, setTier] = React.useState(classes.orange);
    let [cardVisibility, setCardVisibility] = React.useState(false);
    return (
        <div className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={9} >
                    <USAMap customize={statesCustomConfig()} onClick={mapHandler} />
                </Grid>
                <Grid item xs={3} >
                    <Grid item className={classes.formControl}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-customized-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={stateName}
                                onChange={handleStateSelection}
                                label="Age"
                            >
                                <MenuItem value={0}>
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={10}>California</MenuItem>
                                <MenuItem value={20}>Washington</MenuItem>
                                <MenuItem value={30}>Nevada</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.formControl}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-customized-select-native">County Name</InputLabel>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={county}
                                onChange={handleCountyNameSelection}
                            >
                                <MenuItem value={0}>
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={10}>San Francisco</MenuItem>
                                <MenuItem value={20}>Alameda</MenuItem>
                                <MenuItem value={30}>Santa Cruz</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid item>
                            {cardVisibility &&
                                <Card className={classes.root} variant="outlined">
                                    <CardHeader
                                        title="Your County Status"
                                        subheader="November 29 2020"
                                    ></CardHeader>
                                    <CardContent>
                                        <Avatar className={tier} >o</Avatar>
                                    </CardContent>
                                </Card>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>)

}

export default HomeDashBoard;
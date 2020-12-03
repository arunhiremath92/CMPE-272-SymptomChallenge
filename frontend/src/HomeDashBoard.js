import React, { Component } from 'react';
import './App.css'; /* optional for styling like the :hover pseudo-class */

import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, makeStyles, withStyles, MenuItem, NativeSelect, Select, Tooltip, Accordion, AccordionSummary, AccordionDetails, Icon, Divider, Avatar, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import MapChart from './MapChart'

import purple_tire_data from "./data/purple_tier_data";
import orange_tier_data from "./data/orange_tier_data";
import red_tier_data from "./data/red_tier_data";
import { setCountyName, setStateName } from './store/mapsDataActions';
import { connect } from 'react-redux';
import yellow_tier_data from './data/yellow_tier_data';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(1),
    },
    accord_display: {
        padding: theme.spacing(),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        margin: theme.spacing(1),
    },
    text: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    policy: {
        '& > span': {
            margin: theme.spacing(1),
        },
    },
    card: {
        width: 200,
        height: 150,
        margin: theme.spacing(2),
    },
    media: {
        height: 140,
    },
}));



const HomeDashBoard = ({ stateName, county, fips, tier, dispatch }) => {


    let purple = JSON.parse(JSON.stringify(purple_tire_data));
    let yellow = JSON.parse(JSON.stringify(yellow_tier_data));
    let red = JSON.parse(JSON.stringify(red_tier_data));
    let orange = JSON.parse(JSON.stringify(orange_tier_data));
    let tier_policy = [{ sectors: [] }, purple, red, orange, yellow]
    let [policyData, setPolicyData] = React.useState([])
    let [showPolicyData, setShowPolicyData] = React.useState(false);
    let [tier_color, setTierColor] = React.useState("#FF0000")
    let color_schemes = ["#9420D3", "#9420D3",
        "#FF0000",
        "#ffad9f",
        "#FFA500",]

    const classes = useStyles();

    React.useEffect(() => {
        setPolicyData([])
        let body = {
            "state": stateName
        }
        console.log(JSON.stringify(body));
        axios.post("https://covid-19-tier-backend.herokuapp.com/api/policy-info/", body)
            .then((res) => {
                // let response = JSON.parse(res.data);//JSON.parse(res.data)
                console.log(res.data)
                setPolicyData(res.data)
                setShowPolicyData(true);

            })
            .catch((error) => {
                console.log(error)
                setPolicyData([])
                // setShowPolicyData(false);
            })

    }, [stateName])

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h2">
                        COVID 19 Forecast and Tier Assignment
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <MapChart ></MapChart>
                </Grid>
                <Grid item xs={12}>
                    {showPolicyData && <h1>Active Policies for {stateName}</h1>}
                </Grid>
                <Grid item xs={12}>
                    <Grid container>

                        {policyData.map((k) => {
                            return (
                                <Grid item spacing={1} >
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography gutterBottom variant="overline" display="block" gutterBottom>
                                                {k.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {k.value}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>)
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {showPolicyData &&
                        <h1>Forecasted Changes in  Policies for {county}</h1>}
                    {tier_policy[tier].sectors.map((s) => {
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>{s.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Grid container>

                                        <Typography>
                                            {s.tiers[0].description}
                                        </Typography>
                                        <Grid item xs={12} className={classes.accord_display}>
                                            <Typography>
                                                {s.tiers[0].hasOwnProperty('metaData') && s.tiers[0].metaData.map((meta) => {
                                                    return meta
                                                })}
                                            </Typography>
                                        </Grid>

                                        {s.hasOwnProperty('sponsorship_message') &&

                                            <Grid item xs={12}>
                                                <Grid item xs={12}>
                                                    <Divider variant="middle" />
                                                </Grid>
                                                <Grid container>
                                                    <Grid item spacing={1} >
                                                        {<div className={classes.root}>{s.sponsorship_message}</div>}
                                                    </Grid>
                                                    {s.hasOwnProperty('sba_links') && s.sba_links.map((sba) => {
                                                        return (<Grid item spacing={2} >
                                                            <IconButton edge="start" color="inherit" aria-label="sponsor_link">
                                                                <Avatar alt={sba.name} src={sba.icon} />
                                                            </IconButton>
                                                        </Grid>)
                                                    })}
                                                </Grid>
                                            </Grid>
                                        }
                                    </Grid>

                                </AccordionDetails>
                            </Accordion>
                        )
                    })}

                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div >)

}




const mapStateToProps = (state) => {
    return {
        stateName: state.mapsDataReducer.stateName,
        county: state.mapsDataReducer.county,
        fips: state.mapsDataReducer.fips,
        tier: state.mapsDataReducer.tier,
    };
};
export default connect(mapStateToProps)(HomeDashBoard);
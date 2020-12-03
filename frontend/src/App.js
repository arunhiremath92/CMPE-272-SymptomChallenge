import React, { Component } from 'react';
import './App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import PolicyDashboard from './PolicyDashboard';
import TierDashboard from './TierDashboard';
import { AppBar, Button, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Switch, Route, Redirect } from "react-router-dom";
import HomeDashBoard from './HomeDashBoard';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textAlign:"right"
  },
}));



let App = () => {

  /* mandatory */
  const mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  /* optional customization of filling per state and calling custom callbacks per state */
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
  const classes = useStyles();
  let [showTierPrediction, setShowTierPrediction] = React.useState(false);
  let [showPolicyPrediction, setShowPolicyPrediction] = React.useState(false);

  if (showPolicyPrediction) {
    window.location.href = "/policy"
  }
  if (showTierPrediction) {
    window.location.href = "/forecasts"
  }


  const handleForecastBtnEvent = (event) => {
    setShowPolicyPrediction(false)
    setShowTierPrediction(true)
  }

  const handlePolicyPredctionsBtnEvent = (event) => {
    setShowTierPrediction(false)
    setShowPolicyPrediction(true)
  }
  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={(event) => { window.location.href = "/"; }}> Home</Button>
          <Button color="inherit" onClick={handleForecastBtnEvent}> Tier Predictions</Button>
          <Button color="inherit" onClick={handlePolicyPredctionsBtnEvent}> Policy Predictions</Button>
          <Typography className={classes.title}>
            COVID 19 Forecast and Tier Assignment
                    </Typography>

        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <Container>
          <Switch fixed>
            {/*signup*/}
            <Route path="/forecasts/" >
              <TierDashboard></TierDashboard>
            </Route>
            <Route path="/policy" >
              <PolicyDashboard />
            </Route>

            <Route path="/" >
              <HomeDashBoard />
            </Route>

          </Switch>
        </Container>
      </div>
    </div>)
}

export default App;
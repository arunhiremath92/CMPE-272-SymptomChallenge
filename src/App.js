import React, { Component } from 'react';
import './App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import PolicyDashboard from './PolicyDashboard';
import TierDashboard from './TierDashboard';
import { AppBar, Button, Container, makeStyles, Toolbar } from '@material-ui/core';
import { Switch, Route, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
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
      }
    };
  };
  const classes = useStyles();
  let [showTierPrediction, setShowTierPrediction] = React.useState(false);
  let [showPolicyPrediction, setShowPolicyPrediction] = React.useState(false);
  if (showTierPrediction) {
    window.location.href = "/forecasts"
  }
  if (showTierPrediction) {
    window.location.href = "/forecasts"
  }
  if (showPolicyPrediction) {
    window.location.href = "/"
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
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleForecastBtnEvent}> Tier Predictions</Button>
          <Button color="inherit" onClick={handlePolicyPredctionsBtnEvent}> Policy Predictions</Button>

        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <Switch>
          {/*signup*/}
          <Route path="/forecasts/" >
            <TierDashboard></TierDashboard>
          </Route>
          <Route path="/" >
            <PolicyDashboard />
          </Route>

        </Switch>

      </div>
    </div>)
}

export default App;
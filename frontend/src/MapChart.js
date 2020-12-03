import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { setCountyName, setFips, setStateName, setTier } from "./store/mapsDataActions";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";




const MapChart = ({ dispatch }) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        csv("/county_tiers/us_county_tiers.csv").then(counties => {
            console.log("Setting Data");
            setData(counties);
        });
    }, []);

    let colorCoding = [
        "#9420D3",
        "#FF0000",
        "#ffad9f",
        "#FFA500",
    ]

    const colorScale = ["#e0dad7", "#21156e", '#eb0c0c', "#ed4a0e", "#ebd80c"]
    let [region, setRegion] = React.useState("");
    return (
        <Container maxWidth="md">
            <ComposableMap projection="geoAlbersUsa" data-tip="" projectionConfig={{ scale: 800 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            let curr = data.find((element) => {
                                return element.fips === geo.id;
                            })
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    onClick={(event) => {
                                        dispatch(setTier(curr ? curr.tier : 0));
                                        dispatch(setCountyName(geo.properties.name));
                                        dispatch(setStateName(curr ? curr.state :""))
                                        dispatch(setFips(geo.id));
                                    }}
                                    geography={geo}
                                    fill={curr ? colorScale[parseInt(curr.tier)] : '#e0dad7'}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <h3> {region} </h3>
        </Container>
    );
};



const mapStateToProps = (state) => {
    return {
        stateName: state.mapsDataReducer.stateName,
        county: state.mapsDataReducer.county,
        fips: state.mapsDataReducer.fips,
        tier: state.mapsDataReducer.tier,
    };
};

export default connect(mapStateToProps)(MapChart);
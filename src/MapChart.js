import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import { Container } from "@material-ui/core";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const MapChart = ({ setTooltipContent }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // https://www.bls.gov/lau/
        csv("/unemployment_by_county.csv").then(counties => {
            setData(counties);
        });
    }, []);

    const colorScale = scaleQuantile()
        .domain(data.map(d => d.unemployment_rate))
        .range([
            "#9400D3",
            "#FF0000",
            "#ffad9f",
            "#FFA500",
            "#FFFF00",
            "#e2492d",
            "#be3d26",
            "#9a311f",
            "#782618"
        ]);


    let [region, setRegion] = React.useState("");
    return (
        <Container maxWidth="lg">
            <ComposableMap projection="geoAlbersUsa" data-tip="" projectionConfig={{ scale: 640 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const cur = data.find(s => s.id === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        setRegion(geo.properties.name);
                                    }}
                                    onMouseLeave={() => {
                                        setRegion("");
                                    }}
                                    fill={cur ? colorScale(cur.unemployment_rate) : "#EEE"}
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

export default MapChart;

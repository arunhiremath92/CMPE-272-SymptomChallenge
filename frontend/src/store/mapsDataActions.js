export const mapActions = {
    stateName: 'MAPS_SET_STATE',
    county: 'MAPS_SET_COUNTY',
    fips: 'MAPS_SET_FIPS',
    tier: 'MAPS_SET_TIER',
}
export const setStateName = (modalState) => {
    return {
        type: mapActions.stateName,
        stateName: modalState
    };
};

export const setCountyName = (modalState) => {
    return {
        type: mapActions.county,
        county: modalState
    }
}
export const setFips = (modalState) => {
    return {
        type: mapActions.fips,
        fips: modalState
    };
};

export const setTier = (modalState) => {
    return {
        type: mapActions.tier,
        tier: modalState
    };
};
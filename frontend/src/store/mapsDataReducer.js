import { mapActions } from "./mapsDataActions";

let MAPS_STATE = {
    stateName: '',
    county: '',
    fips: '',
    tier: 0,
}

const mapsDataReducer = (state = MAPS_STATE, action) => {
    switch (action.type) {

        case mapActions.stateName:
            return {
                ...state,
                stateName: action.stateName
            }
        case mapActions.county:
            return {
                ...state,
                county: action.county
            }
        case mapActions.fips:
            return {
                ...state,
                fips: action.fips
            }
        case mapActions.tier:
            return {
                ...state,
                tier: action.tier
            }
        default:
            return {
                ...state,
            }

    }
}

export default mapsDataReducer;
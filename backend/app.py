from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS,cross_origin
import pandas as pd
import json
app = Flask(__name__)
CORS(app)


df_tier = pd.read_csv("./data/county_tiers.csv")
df_policies = pd.read_csv("./data/state_policy.csv")
df_state_county = pd.read_csv("./data/us_cities_states_counties.csv",sep = '|',engine = 'python')

us_state_abbrev = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District of Columbia': 'DC',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands':'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
}
abbrev_us_state = dict(map(reversed, us_state_abbrev.items()))

@app.route('/')
def hello():
    endpoints = ['/api/']
    return json.dumps({"message": "try these endpoints", "endpoints":endpoints});


@app.route('/api/case-intentsity/', methods=['GET'])
def get_case_intensity():
    df_state_intensity = pd.read_csv("./data/country_case_intensity.csv")
    color_scheme = [ "#9400D3","#FF0000","#ffad9f","#FFA500"]
    state_intensity = {}
    for index, row in df_state_intensity.iterrows():
       state_intensity [row['state']] =  {"fill": color_scheme[int(row['AssignedValue']) -1]}
    response = jsonify(state_intensity)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/api/county-intentsity/', methods=['GET'])
def get_case_intensity_county():
    df_state_intensity = pd.read_csv("./data/country_case_intensity.csv")
    color_scheme = [ "#9400D3","#FF0000","#ffad9f","#FFA500"]
    state_intensity = {}
    for index, row in df_state_intensity.iterrows():
       state_intensity [row['state']] =  {"fill": color_scheme[int(row['AssignedValue']) -1]}
    response = jsonify(state_intensity)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/getCounties/', methods=['GET'])
def get_county_names():
    state_county_lists = {}
    states = []
    state_names = df_state_county['State full'].unique()
    for s in state_names:
        if s != None:
            states.append(s)
    for state in states:
        county_list = []
        df_state = df_state_county[df_state_county['State full'] == state]
        if not df_state.empty:
            counties = df_state['County'].unique() 
            for county in counties:
                county_list.append(str(county).title())
        county_list.sort()
        state_county_lists[state] = county_list    
    response = jsonify(state_county_lists)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/api/policy-info/',methods =['POST'])
def get_policy_info():
    body = request.json
    state_name = body['state']
    print(abbrev_us_state[state_name])
    state_name = abbrev_us_state[state_name]
    df_state = df_policies[df_policies['Location'] == state_name]
    if not df_state.empty :
        json_dict = []
        columns = df_state.columns
        for column in columns:
            if column != 'Location' and column !='Footnotes' and column !='Emergency Declaration':
                row ={'name': column, 'value' : df_state.iloc[0][column]}
                json_dict.append(row)
        response = jsonify(json_dict)
        return response
    else:
        response = jsonify({})
        return response

if __name__ == '__main__':
    app.run()
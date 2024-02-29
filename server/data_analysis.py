import pandas as pd

def gatherValSet(betaId):
    medDf = pd.read_csv("data/medications.csv")
    betaDf = pd.read_csv("data/beta_blocker_value_sets.csv")
    betaDf = betaDf.loc[betaDf["value_set_id"] == betaId]
    medicationArr = betaDf.at[betaDf.index[0], "medications"].split("|")
    medications = {}
    
    for x in medicationArr:
        tmpDf = medDf.loc[medDf["medication_id"] == int(x)]
        medications[x] = {}

        medname = tmpDf["medname"].to_string()
        medname = medname[(medname.find(" ") + 1):]
        medications[x]["medname"] = medname

        simpleGeneric = tmpDf["simple_generic_name"].to_string()
        simpleGeneric = simpleGeneric[(simpleGeneric.find(" ") + 1):]
        medications[x]["simple_generic_name"] = simpleGeneric

        route = tmpDf["route"].to_string()
        route = route[(route.find(" ") + 1):]
        medications[x]["route"] = route

        outpatients = tmpDf["outpatients"].to_string()
        outpatients = outpatients[(outpatients.find(" ") + 1):]
        medications[x]["outpatients"] = outpatients

        inpatients = tmpDf["inpatients"].to_string()
        inpatients = inpatients[(inpatients.find(" ") + 1):]
        medications[x]["inpatients"] = inpatients
        
        patients = tmpDf["patients"].to_string()
        patients = patients[(patients.find(" ") + 1):]
        medications[x]["patients"] = patients

    return medications

def gatherAllValSets():
    setsDf = pd.read_csv("data/beta_blocker_value_sets.csv")
    setIds = setsDf["value_set_id"]

    valueSets = {}

    for x in setIds:
        tmpDf = setsDf.loc[setsDf["value_set_id"] == x]
        name = tmpDf["value_set_name"]
        name = name.to_string()
        name = name[(name.find(" ") + 1):]
        valueSets[x] = {}
        valueSets[x]["name"] = name
        valueSets[x]["meds"] = gatherValSet(x)

    return valueSets

import pandas as pd

def gatherValSet(betaId, medications):
    medDf = pd.read_csv("data/medications.csv")
    betaDf = pd.read_csv("data/beta_blocker_value_sets.csv")
    betaDf = betaDf.loc[betaDf["value_set_id"] == betaId]
    betaName = betaDf["value_set_name"].to_string()
    betaName = betaName[(betaName.find(" ") + 1):]
    medicationArr = betaDf.at[betaDf.index[0], "medications"].split("|")

    
    for x in medicationArr:
        tmpDf = medDf.loc[medDf["medication_id"] == int(x)]
        tmpMed = {}

        medname = tmpDf["medname"].to_string()
        medname = medname[(medname.find(" ") + 1):]
        tmpMed["medname"] = medname

        simpleGeneric = tmpDf["simple_generic_name"].to_string()
        simpleGeneric = simpleGeneric[(simpleGeneric.find(" ") + 1):]
        tmpMed["simple_generic_name"] = simpleGeneric

        route = tmpDf["route"].to_string()
        route = route[(route.find(" ") + 1):]
        tmpMed["route"] = route

        outpatients = tmpDf["outpatients"].to_string()
        outpatients = outpatients[(outpatients.find(" ") + 1):]
        tmpMed["outpatients"] = outpatients

        inpatients = tmpDf["inpatients"].to_string()
        inpatients = inpatients[(inpatients.find(" ") + 1):]
        tmpMed["inpatients"] = inpatients
        
        patients = tmpDf["patients"].to_string()
        patients = patients[(patients.find(" ") + 1):]
        tmpMed["patients"] = patients

        tmpMed["beta_name"] = betaName
        medications.append(tmpMed)

    return medications

def gatherAllValSets():
    setsDf = pd.read_csv("data/beta_blocker_value_sets.csv")
    setIds = setsDf["value_set_id"]

    valueSets = []

    for x in setIds:
        valueSets = gatherValSet(x, valueSets)

    return valueSets

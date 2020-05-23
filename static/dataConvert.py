# Take csv Files to JSON

import csv
import json


# Open Files
def openFile(fileName, storeData):
    with open(fileName, 'rt') as csvfile:
        csv_reader = csv.reader(csvfile)
        for line in csv_reader:
            storeData.append(line)


# Remove Keys from Data
def pop_keys(data_array):
    for dataset in data_array:
        dataset.pop(0)


# Remove White Space in Data
def remove_empty_space(data_array):
    for dataset in data_array:
        for i in range(len(dataset)):
            for j in range(len(dataset[i])):
                if dataset[i][j] == '':
                    dataset[i].remove('')


# Global Var for each file
populationData = []         # Store population data
coalData = []               # Store country coal data
biofuelData = []            # Store biofuel data
naturalGasData = []
petroleumData = []
electricityData = []
importData = []
exportData = []
energyData = []

# Open and load Data
openFile('../data/Country_Population.csv', populationData)
openFile('../data/Coal_Yearly.csv', coalData)
openFile('../data/Biofuels_Yearly.csv', biofuelData)
openFile('../data/NaturalGas_Yearly.csv', naturalGasData)
openFile('../data/Petroleum_Yearly.csv', petroleumData)
openFile('../data/Electricity_Yearly.csv', electricityData)
openFile('../data/Import_Yearly.csv', importData)
openFile('../data/Export_Yearly.csv', exportData)
openFile('../data/Energy_Consumption_Country.csv', energyData)

# Get Keys of Population Data
populationKey = populationData[0]
populationKey.remove('\xef\xbb\xbfCountry')    # Remove 'Country' tag (utf-8-sig encoding)
populationData.pop(0)       # Remove Keys from data

# Remove Keys from data
pop_keys([coalData, biofuelData, naturalGasData, petroleumData, electricityData, importData, exportData, energyData])

# Remove WhiteSpace from Data
remove_empty_space([populationData, coalData, biofuelData, naturalGasData, petroleumData, electricityData, importData, exportData, energyData])


# ONLY years (1980-2020)
yearsOnly = []
for keys in populationKey:
    if keys != 'Area':
        yearsOnly.append(int(keys))

# Get country Area
countryArea = {}
for country in populationData:
    countryArea[country[0]] = country[-1:][0]

# Get Country names
countryName = []
for row in populationData:
    countryName.append(row[0])

# Store all years w/ dict
allKeys = {}
for year in populationKey:
    if year == 'Area':
        allKeys[year] = 0
    else:
        allKeys[year] = {}


# Load All Data in Dict
dataDict = {}
for i in range(len(populationData)):
    currentCountry = coalData[i][0]             # Get current country

    currentPopulationData = populationData[i][1:]   # Get Population data ONLY
    currentCoalData = coalData[i][1:]               # Get Coal data ONLY for current country
    currentBiofuelData = biofuelData[i][1:]         # Get Biofuel data ONLY for current country
    currentNaturalGasData = naturalGasData[i][1:]
    currentPetrolData = petroleumData[i][1:]
    currentElectricityData = electricityData[i][1:]
    currentImportData = importData[i][1:]
    currentExportData = exportData[i][1:]
    currentEnergyData = energyData[i][1:]

    # Create current Dict w/ Area
    currentCountryDict = {'Area': int(countryArea[currentCountry])}

    # With in country, Loop through all years
    for j in range(len(yearsOnly)):
        # Add all data to each year
        currentCountryDict[yearsOnly[j]] = {
            'population': float(currentPopulationData[j]),
            'coal': float(currentCoalData[j]),
            'biofuel': float(currentBiofuelData[j]),
            'naturalGas': float(currentNaturalGasData[j]),
            'petroleum': float(currentPetrolData[j]),
            'electricity': float(currentElectricityData[j]),
            'import': float(currentImportData[j]),
            'export': float(currentExportData[j]),
            'energy': float(currentEnergyData[j])
        }

    # Add country & related Data
    dataDict[currentCountry] = currentCountryDict

# Write Data to JSON FILE
with open('../data/projectData.json', 'w') as jsonfile:
    json.dump(dataDict, jsonfile, indent=4)

print('completed')

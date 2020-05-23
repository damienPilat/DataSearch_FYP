// File to get and set all data
// Functions:
//  setAllData():
//      opens all cvs and loads data into global var

// Country Data
var tradeData;                                  // Trade
var commoditiesData;                            // Commodities
var energyData;                                 // Energy
var emissionData;                               // Emission
var countryCode;                                // Country Codes

// Yearly Data
var countryPopulation;                          // Yearly Country population
var importYearly, exportYearly;                 // Trade
var coalYearly, petroleumYearly, biofuelYearly, naturalGasYearly, electricityYearly;    // Commodities
var co2Yearly;
var greenhouseYearly;
var methaneYearly; // Emissions


// buildPieChart: Get all data from file, set to global var
function setAllData() {
    // Get and set data to global var
    d3.csv('../data/Trade_Country.csv', function (data) {
        tradeData = data;       // set file contents to tradeData global var
    });

    d3.csv('../data/Commodities_Country.csv', function (data) {
        commoditiesData = data;
    });

    d3.csv('../data/Energy_Consumption_Country.csv', function (data) {
        energyData = data;
    });

    d3.csv('../data/worldBank/Emissions_Country.csv', function (data) {
        emissionData = data;
    });

    d3.csv('../data/Country_Code.csv', function (data) {
        countryCode = data;
    });


    d3.csv('../data/Import_Yearly.csv', function (data) {
        importYearly = data;
    });

    d3.csv('../data/Export_Yearly.csv', function (data) {
        exportYearly = data;
    });

    d3.csv('../data/Coal_Yearly.csv', function (data) {
        coalYearly = data;
    });

    d3.csv('../data/Petroleum_Yearly.csv', function (data) {
        petroleumYearly = data;
    });

    d3.csv('../data/Biofuels_Yearly.csv', function (data) {
        biofuelYearly = data;
    });

    d3.csv('../data/NaturalGas_Yearly.csv', function (data) {
        naturalGasYearly = data;
    });

    d3.csv('../data/Electricity_Yearly.csv', function (data) {
        electricityYearly = data;
    });

    d3.csv('../data/Country_Population.csv', function (data) {
        countryPopulation = data;
    });

    d3.csv('../data/worldBank/co2_Yearly.csv', function (data) {
        co2Yearly = data;
    });

    d3.csv('../data/worldBank/greenhouse_Yearly.csv', function (data) {
        greenhouseYearly = data;
    });

    d3.csv('../data/worldBank/methane_Yearly.csv', function (data) {
        methaneYearly = data;
    });
} // END: setAllData

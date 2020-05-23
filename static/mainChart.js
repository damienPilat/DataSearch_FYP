// Main File to build charts based on Chart.js
// Functions:
//  buildChartMain(canvasID, indicatorData, dataOptions, chartOptions, chartType):
//      -> Main function to build chart, called from chartOptions.js:homeCharts()
//  getCountryData(indicatorData):
//      -> Helper function to get data for selected country
// getStats(indicatorData, i):
//      -> Helper function to get only data and not keys
// chartBuild(chartCanvas, chartLabels, countryData, dataOptions, chartOptions, chartType):
//      -> Function to collect all data and build chart to DOM



// Global Var for chart design
// Chart.defaults.global.defaultFontFamily = 'Lato';
// Chart.defaults.global.defaultFontFontSize = 18;
// Chart.defaults.global.defaultFontColor = 'red';

// --------------------------------
// Chart build for Multiple dataset for Country
// --------------------------------
// Main Function called to build Map
// canvasID for chart, imported cvs data, options for data, options for chart, type of chart
function buildChartMultData_country(canvasID, datasets, datasetsOptions, chartOptions, chartType) {
    // Get Canvas from DOM
    let chartCanvas = document.getElementById(canvasID).getContext('2d');
    // Get Labels (w/out 'Country')
    let chartLabels = Object.keys(datasets[0][0][0]).filter(item => item !== 'Country');
    // Get data for selected country
    let countryDataArray = getCountryDataMult_country(datasets);
// DEBUG - 2nd country not showing on chart
    console.log('countryArray:', countryDataArray);

    // Build Chart
    chartBuildMult_country(chartCanvas, chartLabels, countryDataArray, datasetsOptions, chartOptions, chartType);
} // END: buildChartMultData


// Collected country Data from datasets
function getCountryDataMult_country(datasets) {
    // Array for country data in each dataset
    let countryDataArray = [];

    // Loop through all datasets
    for (let i=0; i<datasets.length; i++) {
        // loop through all country data within dataset
        for (let j=0; j<datasets[i][0].length; j++) {
            // Get current country
            let currentCountry = datasets[i][0][j].Country;
            // Check current country w/ selected country
            if (currentCountry === datasets[i][1]) {
                //Add to array values (only) of given country
                countryDataArray.push(getMultStats_country(datasets[i][0][j]));
            } //END:if current = selected
        } //END:for j<datasets[i][i]
    } //END:for i<datasets.length
    return countryDataArray;
} //END getCountryDataMult


// Remove Country name and return only values of given dataset entry
function getMultStats_country(dataset) {
    let countryValues = dataset;                // Temp object for mods
    delete countryValues.Country;               // Remove country name from object
    return Object.values(countryValues);        // Return values of object
} // END: getMultStats


// Build chart w/ mult datasets
function chartBuildMult_country(chartCanvas, chartLabels, countryDataArray, datasetsOptions, chartOptions, chartType) {
    let chartData = {
        labels: chartLabels,
        datasets: getDatasetsMult(countryDataArray, datasetsOptions)
    };

    let newChart = new Chart(chartCanvas, {
        type: chartType,
        data: chartData,
        options: chartOptions
    });

    function getDatasetsMult(countryDataArray, datasetsOptions) {
        // Create Dataset for Chart
        let chartDataset = [];

        // Loop through datasets, populating data to chartDataset
        // Loop through countryDataArray
        for (let i=0; i<countryDataArray.length; i++) {
            chartDataset.push({data: countryDataArray[i]});     // add countryData to chartDataset

            let currentObject = chartDataset[i];                // Get relevant object of chartDataset
            let currentOptionsKeys = Object.keys(datasetsOptions[i]);   // Get keys of relevant datasets options
            addOptionsDataset(currentObject, datasetsOptions[i], currentOptionsKeys);   // add Options to dataset
        } // END: for i<datasets.length

        return chartDataset
    } // END: getDatasetsMult

    function addOptionsDataset(currentObject, datasetOptions, datasetOptionsKeys) {
        // Loop through Data options
        for (let i=0; i<datasetOptionsKeys.length; i++) {
            let optionKey = Object.keys(datasetOptions)[i];         // Get Option Key
            currentObject[optionKey] = datasetOptions[optionKey];   // Add new key & val to dataset
        }
    } //END: addOptionsDataset
} // END: chartBuildMult_country








// --------------------------------
// Chart build for Multiple dataset
// --------------------------------
// Main Function called to build Map
// canvasID for chart, imported cvs data, options for data, options for chart, type of chart
function buildChartMultData(canvasID, datasets, datasetsOptions, chartOptions, chartType) {
    // Get Canvas from DOM
    let chartCanvas = document.getElementById(canvasID).getContext('2d');
    // Get Labels (w/out 'Country')
    let chartLabels = Object.keys(datasets[0][0]).filter(item => item !== 'Country');
    // Get data for selected country
    let countryDataArray = getCountryDataMult(datasets);

    // Build Chart
    chartBuildMult(chartCanvas, chartLabels, countryDataArray, datasetsOptions, chartOptions, chartType);
} // END: buildChartMultData


// Collected country Data from datasets
function getCountryDataMult(datasets) {
    // Array for country data in each dataset
    let countryDataArray = [];

    // Loop through all datasets
    for (let i=0; i<datasets.length; i++) {
        // loop through all country data within dataset
        for (let j=0; j<datasets[i].length; j++) {
            // Get current country
            let currentCountry = datasets[i][j].Country;
            // Check current country w/ selected country
            if (currentCountry === selected_country) {
                //Add to array values (only) of given country
                countryDataArray.push(getMultStats(datasets[i][j]));
            } //END:if current = selected
        } //END:for j<datasets[i]
    } //END:for i<datasets.length
    return countryDataArray;
} //END getCountryDataMult


// Remove Country name and return only values of given dataset entry
function getMultStats(dataset) {
    let countryValues = dataset;                // Temp object for mods
    //delete countryValues.Country;               // Remove country name from object
    return Object.values(countryValues);        // Return values of object
} // END: getMultStats


// Build chart w/ mult datasets
function chartBuildMult(chartCanvas, chartLabels, countryDataArray, datasetsOptions, chartOptions, chartType) {
    let chartData = {
        labels: chartLabels,
        datasets: getDatasetsMult(countryDataArray, datasetsOptions)
    };

    let newChart = new Chart(chartCanvas, {
        type: chartType,
        data: chartData,
        options: chartOptions
    });

    function getDatasetsMult(countryDataArray, datasetsOptions) {
        // Create Dataset for Chart
        let chartDataset = [];

        // Loop through datasets, populating data to chartDataset
        // Loop through countryDataArray
        for (let i=0; i<countryDataArray.length; i++) {
            chartDataset.push({data: countryDataArray[i]});     // add countryData to chartDataset

            let currentObject = chartDataset[i];                // Get relevant object of chartDataset
            let currentOptionsKeys = Object.keys(datasetsOptions[i]);   // Get keys of relevant datasets options
            addOptionsDataset(currentObject, datasetsOptions[i], currentOptionsKeys);   // add Options to dataset
        } // END: for i<datasets.length

        return chartDataset
    } // END: getDatasetsMult

    function addOptionsDataset(currentObject, datasetOptions, datasetOptionsKeys) {
        // Loop through Data options
        for (let i=0; i<datasetOptionsKeys.length; i++) {
            let optionKey = Object.keys(datasetOptions)[i];         // Get Option Key
            currentObject[optionKey] = datasetOptions[optionKey];   // Add new key & val to dataset
        }
    } //END: addOptionsDataset
} // END: chartBuildMult


// -------------------------
// Chart build for 1 dataset
// -------------------------
// Main Function called to build Map
// canvasID for chart, imported cvs data, options for data, options for chart, type of chart,
function buildChartMain(canvasID, indicatorData, dataOptions, chartOptions, chartType) {
    let chartCanvas = document.getElementById(canvasID).getContext('2d');            // Get canvas from DOM
    // Get Labels (not including 'Country')
    let chartLabels = Object.keys(indicatorData[0]).filter(item => item !== 'Country');
    let countryData = getCountryData(indicatorData);                // Get data for selected country

    // Build Chart
    chartBuild(chartCanvas, chartLabels, countryData, dataOptions, chartOptions, chartType);
} // END: buildChartMain


// Get Data from selected Country
function getCountryData(indicatorData, removeKeys=true) {
    for (let i = 0; i < indicatorData.length; i++) {        // Loop through global data
        let currentCountry = indicatorData[i].Country;      // Get country name
        if (currentCountry === selected_country) {          // Compare country name w/ selected country
            if (removeKeys) {
                return getStats(indicatorData, i);          // return tradeValues only
            }
            return indicatorData[i];                       // return complete data
        }
    } //END: for data.length
} //END: getCountryData


// Return formatted array of only country data
function getStats(indicatorData, i) {
    let countryValues = indicatorData[i];       // temp object for mods
    delete countryValues.Country;               // Remove country from temp - Apparent no change, did delete from main
    return Object.values(countryValues);        // Return values of object
} // END: getImportStats


// Build chart w/ country Data
function chartBuild(chartCanvas, chartLabels, countryData, dataOptions, chartOptions, chartType) {
    // Data for Chart
    let chartData = {
        labels: chartLabels,
        datasets: getDataset(countryData, dataOptions)
    };

    console.log('data for:', chartCanvas, ':', chartData);

    // Set Chart on chartCanvas w/ chartType, chartData & chartOptions
    let newChart = new Chart(chartCanvas,{
        type: chartType,
        data: chartData,
        options: chartOptions
    });


    // Populate Dataset w/ data options
    function getDataset(countryData, dataOptions) {
        // Create dataset w/ data
        let chartDataset = [{
            data: countryData,
        }];

        // Get array within dataset
        let insideArray = chartDataset[0];
        // Get keys of dataOptions
        let dataOptionKeys = Object.keys(dataOptions);


        // Loop through data options
        for (let i=0; i<dataOptionKeys.length; i++) {
            let optionKey = Object.keys(dataOptions)[i];    // Get Option Key
            // Add new key and value to inside Array of Dataset
            insideArray[optionKey] = dataOptions[optionKey];
        } // END: for i<dataOptionKeys

        return chartDataset
    } // END: getDataset
} // END: chartBuild

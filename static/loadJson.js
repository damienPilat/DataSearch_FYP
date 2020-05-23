let globalData;

// LOAD local JSON Data
$.getJSON('../data/projectData.json', callbackFunction);

// Build charts w/ data
function callbackFunction(data) {
    globalData = data;

    let testDataOptions = {
        backgroundColor: ['#99CFFF', '#33A0FF'],
        borderColor: '#FFFFFF',
        hoverBorderWidth: 4,
        hoverBorderColor: ['#D1E9FF', '#7FC3FF'],
    };

    let testChartOptions = setChartOptions('Test Chart');

    buildTestChart('testYearly', globalData, ['coal'], testDataOptions, testChartOptions, 'line');
}

function buildTestChart(canvasID, data, dataCriteria, dataOptions, chartOptions, chartType) {
    let chartCanvas = document.getElementById(canvasID).getContext('2d');            // Get canvas from DOM

    // Get all country
    let countryNames = Object.keys(data);
    // Get Chart Labels
    let chartLabels = getChartLabels(data, countryNames);
    // Get country data
    let countryData = getCountryData(data, dataCriteria, chartLabels, countryNames);

    console.log(chartLabels);
} // END: buildTestChart

function getChartLabels(data, countryNames) {
    let labelObject = data[countryNames[0]];      // Get labels of country
    delete labelObject.Area;                    // Remove Area key

    return Object.keys(labelObject);    // Return Keys of object
} // END: getChartLabels

function getCountryData(data, dataCriteria, chartLabels) {
    let datasets = [];
    for (let a = 0; a < dataCriteria.length; a++) {
        datasets.push([])
    }

    console.log(datasets);

    // Loop dataCriteria (what data wanted)
    for (let i = 0; i < dataCriteria.length; i++) {
        for (let j = 0; j < chartLabels.length; i++) {

            console.log(data[selected_country][chartLabels[j]][dataCriteria[i]]);
        }
    }
}

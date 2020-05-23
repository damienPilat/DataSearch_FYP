// File for data and chart options of Charts
// Functions:
//  homeCharts():
//      -> creates all charts specifying data and chart options. called from DOM onload=""


// --*--*--*--*--*--*--*--*--
// HOMEPAGE - COUNTRY CHARTS
// --*--*--*--*--*--*--*--*--
function homeCharts() {
    // Update Country Name
    displayCountryName('country-header', [selected_country]);

    //------------------------------------
    // Trade, Country, Latest - Pie Chart
    //------------------------------------
    // Data Options
    let tradeCountry_dataOptions = basicDataOptions([[153, 207, 255,1], [51, 160, 255,1]], [255,255,255,1], [[209, 233, 255,1],[127, 195, 255,1]], 4);
    // Chart Options
    let tradeCountry_chartOptions = basicChartOptions('Import & Export');
    // Chart Build
    buildChartMain('tradeCanvas', tradeData, tradeCountry_dataOptions, tradeCountry_chartOptions, 'doughnut');


    //-------------------------------------------
    // Commodities, Country, Latest - Radar Chart
    //-------------------------------------------
    // Data Options
    let comodCountry_dataOptions = {
        backgroundColor: 'rgba(0,200,0,0.1)',   // line fill color
        borderColor: 'rgba(0,200,0,0.6)',       // line color
        borderJoinStyle: 'round',               // join of line
        borderWidth: 3,
        pointBorderWith: 10,
        pointBackgroundColor: 'rgba(0,200,0,1)',
        pointBorderColor: 'rgba(0,200,0,0.6)'
    };

    // Chart Options
    let comodCountry_chartOptions = basicChartOptions('Commodities', false);
    // Chart Chart
    buildChartMain('commodCanvas', commoditiesData, comodCountry_dataOptions, comodCountry_chartOptions, 'radar');


    //----------------------------------------
    // Energy, Country, allYears - Line Chart
    //----------------------------------------
    // Data Options
    let energyYearly_dataOptions = setDataOptions('', [220,0,0], 'A');
    // Chart Options
    let energyYearly_chartOptions = setChartOptions(
        'Energy Consumption',
        ['1980', '2020'],
        'Years',
        false,
        'quadrillion BTU'
    );
    // Chart Build
    buildChartMultData('energyCanvas', [energyData], [energyYearly_dataOptions], energyYearly_chartOptions, 'line');


    //----------------------------------------
    // Emission, Country, allYears - Line Chart
    //----------------------------------------
    // Data Options
    let emissionCountry_dataOptions = basicDataOptions([[219, 108, 121],[192, 223, 133],[222, 185, 134]],[255,255,255,1],[[237, 158, 168],[212, 239, 162],[247, 216, 173]]);
    // Chart Options
    let emissionCountry_chartOptions = setChartOptions('Emission', ['1980', '2020'], 'Types');
    // Chart Build
    buildChartMain('emissionCanvas', emissionData, emissionCountry_dataOptions, emissionCountry_chartOptions, 'bar');
} // END: homeCharts



// --*--*--*--*--*--*--*--*--*--
// HISTORY PAGE - YEARLY CHARTS
// --*--*--*--*--*--*--*--*--*--
function yearlyCharts() {
    //----------------------------------------
    // Trade, Country, allYears - Line Chart
    //----------------------------------------
    // Data Options
    let importYearly_DataOptions = setDataOptions('Import', [0,220,0], 'A');
    let exportYearly_DataOptions = setDataOptions('Export', [0,0,220], 'B');
    // Chart Options
    let tradeYearly_LineOptions = setChartOptions(
        'Import & Export',
        ['1992', '2018'],
        'Years',
        true,
        'Import (US$ trillion)',
        'Export (US$ trillion)',
        true);
    // Build Chart
    buildChartMultData('yearlyTradeCanvas', [importYearly, exportYearly], [importYearly_DataOptions, exportYearly_DataOptions], tradeYearly_LineOptions, 'line');


    //----------------------------------------
    // Commodities, Country, allYears - Line Chart
    //----------------------------------------
    // Data Options
    let coalYearly_DataOptions = setDataOptions('Coal', [217, 154, 197], 'A');
    let petrolYearly_DataOptions = setDataOptions('Petroleum', [171, 226, 218], 'A');
    let naturalGasYearly_DataOptions = setDataOptions('Natural Gas', [189, 43, 43], 'A');
    let biofuelsYearly_DataOptions = setDataOptions('Biofuel', [60, 176, 226], 'A');
    let electricityYearly_DataOptions = setDataOptions('Electricity', [242, 163, 89], 'B');
    // Chart Options
    let commoditiesYearly_ChartOptions = setChartOptions(
        'Commodities',
        ['1980', '2020'],
        'Years',
        true,
        'Production',
        'Electricity Production (billion kWh)',
        true);
    // Chart Build
    buildChartMultData('yearlyCommoditiesCanvas',
        [coalYearly, petroleumYearly, naturalGasYearly, biofuelYearly, electricityYearly],
        [coalYearly_DataOptions, petrolYearly_DataOptions, naturalGasYearly_DataOptions, biofuelsYearly_DataOptions, electricityYearly_DataOptions],
        commoditiesYearly_ChartOptions, 'line');

    //----------------------------------------
    // Energy, Country, allYears - Line Chart
    //----------------------------------------
    // Data Options
    let energyYearly_dataOptions = setDataOptions('', [220,0,0], 'A');
    // Chart Options
    let energyYearly_chartOptions = setChartOptions(
        'Energy Consumption',
        ['1980', '2020'],
        'Years',
        false,
        'quadrillion BTU'
    );
    // Chart Build
    buildChartMultData('yearlyEnergyCanvas', [energyData], [energyYearly_dataOptions], energyYearly_chartOptions, 'line');

    //----------------------------------------
    // Emission, Country, allYears - Line Chart
    //----------------------------------------
    // Data Options
    let co2Yearly_DataOptions = setDataOptions('CO2', [67, 170, 139], 'A');
    let greenhouseYearly_DataOptions = setDataOptions('Greenhouse', [255, 111, 89], 'B');
    let methaneYearly_DataOptions = setDataOptions('Methane', [237, 175, 151], 'B');
    // Chart Options
    let emissionYearly_ChartOptions = setChartOptions(
        'Emissions',
        ['1960', '2020'],
        'Years',
        true,
        'emissions (kt)',
        'kt of CO2 equivalent',
        true);
// DEBUG - Data not loading from csv call
    console.log('co2Yearly_options:', co2Yearly);
    // Chart Build
    buildChartMultData('yearlyEmissionCanvas',
        [co2Yearly, greenhouseYearly, methaneYearly],
        [co2Yearly_DataOptions, greenhouseYearly_DataOptions, methaneYearly_DataOptions],
        emissionYearly_ChartOptions, 'line');


} // END: yearlyCharts


// --*--*--*--*--*--*--*--*--*--
// COMPARISON PAGE - Comparing Charts
// --*--*--*--*--*--*--*--*--*--
function compCharts() {
    displayCountryName('comp-country-header', [selected_country, previous_country]);

    //----------------------------------------
    // Trade, Comparison, Latest - Pie Chart
    //----------------------------------------
    // Data Options
    let tradeCompOne_dataOptions = basicDataOptions([[153, 207, 255,1], [51, 160, 255,1]], [255,255,255,1], [[209, 233, 255,1],[127, 195, 255,1]], 4);
    let tradeCompTwo_dataOptions = basicDataOptions([[250, 158, 158,1], [245, 61, 61,1]], [255,255,255,1], [[255, 229, 229,1],[217, 135, 135,1]], 4);
    // Chart Options Basic
    let tradeComp_chartOptions = basicChartOptions('Import & Export');
    // Chart Build - Mult Dataset
    buildChartMultData_country('tradeComp',
        [[tradeData, selected_country,], [tradeData, previous_country]],
        [tradeCompOne_dataOptions, tradeCompTwo_dataOptions],
        tradeComp_chartOptions, 'doughnut');

    //-------------------------------------------
    // Commodities, Comparison, Latest - Radar Chart
    //-------------------------------------------
    // Data Options
    let comodCompOne_dataOptions = {
        backgroundColor: 'rgba(0,200,0,0.1)',   // line fill color
        borderColor: 'rgba(0,200,0,0.6)',       // line color
        borderJoinStyle: 'round',               // join of line
        borderWidth: 3,
        pointBorderWith: 10,
        pointBackgroundColor: 'rgba(0,200,0,1)',
        pointBorderColor: 'rgba(0,200,0,0.6)'
    };
    let comodCompTwo_dataOptions = {
        backgroundColor: 'rgba(60,100,200,0.1)',   // line fill color
        borderColor: 'rgba(60,100,200,0.6)',       // line color
        borderJoinStyle: 'round',               // join of line
        borderWidth: 3,
        pointBorderWith: 10,
        pointBackgroundColor: 'rgba(60,100,200,1)',
        pointBorderColor: 'rgba(60,100,200,0.6)'
    };
    // Chart Options
    let comodComp_chartOptions = basicChartOptions('Commodities');
    // Chart Chart
    //buildChartMultData('commodComp', [commoditiesData, commoditiesData], [comodCompOne_dataOptions, comodCompTwo_dataOptions], comodComp_chartOptions, 'radar');
    buildChartMultData_country('commodComp',
        [[commoditiesData, selected_country,],[commoditiesData, previous_country]],
        [comodCompOne_dataOptions, comodCompTwo_dataOptions],
        comodComp_chartOptions, 'radar');


    //----------------------------------------
    // Energy, Comparison, Latest - Line Chart
    //----------------------------------------
    // Data Options
    // -> W/ colorus
    // let energyCompOne_dataOptions = basicDataOptions([[153, 207, 255,1], [51, 160, 255,1]], [255,255,255,1], [[209, 233, 255,1],[127, 195, 255,1]], 4);
    // let energyCompTwo_dataOptions = basicDataOptions([[250, 158, 158,1], [245, 61, 61,1]], [255,255,255,1], [[255, 229, 229,1],[217, 135, 135,1]], 4);

    let energyCompOne_dataOptions = setDataOptions('', [153, 207, 255,1], 'A');
    let energyCompTwo_dataOptions = setDataOptions('', [250, 158, 158,1], 'A');
    // Chart Options Basic
    let energyComp_chartOptions = setChartOptions(
        'Energy Consumption',
        ['1980', '2020'],
        'Years',
        true,
        'quadrillion BTU'
    );
    // Chart Build - Mult Dataset
    buildChartMultData_country('energyComp',
        [[energyData, selected_country,], [energyData, previous_country]],
        [energyCompOne_dataOptions, energyCompTwo_dataOptions],
        energyComp_chartOptions, 'line');


    //----------------------------------------
    // Trade, Comparison, Latest - Bar Chart
    //----------------------------------------
    // Data Options
    let emissionCompOne_dataOptions = basicDataOptions([[153, 207, 255,1], [51, 160, 255,1]], [255,255,255,1], [[209, 233, 255,1],[127, 195, 255,1]], 4);
    let emmisionCompTwo_dataOptions = basicDataOptions([[250, 158, 158,1], [245, 61, 61,1]], [255,255,255,1], [[255, 229, 229,1],[217, 135, 135,1]], 4);
    // Chart Options Basic
    let emmisionComp_chartOptions = basicChartOptions('Emissions');
    // Chart Build - Mult Dataset
    buildChartMultData_country('emissionComp',
        [[emissionData, selected_country,], [emissionData, previous_country]],
        [emissionCompOne_dataOptions, emmisionCompTwo_dataOptions],
        emmisionComp_chartOptions, 'bar');

} // END: compCharts

// ------
// HELPER
// ------

// Data Options -> Single dataset
function basicDataOptions(backColor, border, hoverColor, hoverWidth=undefined){
    return {
        backgroundColor: getAllColor(backColor),
        borderColor: getColor(border, 'full'),
        hoverBorderColor: getAllColor(hoverColor),
        hoverBorderWidth: hoverWidth
    }
} // END: basicDataOptions

function getAllColor(colorArray) {
    let resultColor = [];
    for (let i=0; i<colorArray.length; i++) {
        resultColor.push(getColor(colorArray[i]));
    }
    return resultColor
} // END: getAllColor


// Data Options -> Mult dataset
function setDataOptions(label, lineColor, axis='') {
    return {
        label: label,
        yAxisID: axis,
        backgroundColor: getColor(lineColor, 'bk'),     // color of points
        borderColor: getColor(lineColor, 'border'),     // color of line
        borderJoinStyle: 'round',                       // join of line
        fill: false,                                    // area under line
        lineTension: .5,                                // straight or curved b/w points [default 0]
        pointHoverBackgroundColor: getColor(lineColor, 'point'),    // color of point when hovered
        pointHoverBorderColor: getColor(lineColor, 'pointBorder'),  // color of border when hovered
        //pointHoverBorderWidth: 1                      // Width of border when hovered
        pointHoverRadius: 6,                            // Radius of point when hovered
    }
} // END: setDataOptions


// Get color variants based on array rgb
function getColor(linecolor, code='def') {
    let color = 'rgba(0,0,10,1)';
    switch (code) {
        case 'bk':
            color = `rgba(${linecolor[0]},${linecolor[1]},${linecolor[2]},1)`;
            break;
        case 'border':
            color = `rgba(${(linecolor[0]<255) ? linecolor[0]+5 : 255},${(linecolor[1]<255) ? linecolor[1]+5 : 255},${(linecolor[2]<255) ? linecolor[2]+5 : 255},1)`;
            break;
        case 'point':
            color = `rgba(${linecolor[0]},${linecolor[1]},${linecolor[2]},6)`;
            break;
        case 'pointBorder':
            color = `rgba(${(linecolor[0]<255) ? linecolor[0]+5 : 255},${(linecolor[1]<255) ? linecolor[1]+5 : 255},${(linecolor[2]<255) ? linecolor[2]+5 : 255},.6)`;
            break;
        case 'full':
            color = `rgba(${linecolor[0]},${linecolor[1]},${linecolor[2]},${linecolor[3]})`;
        default:
            color = `rgba(${linecolor[0]},${linecolor[1]},${linecolor[2]},1)`;
    }
    return color
} // END: getColor


// Chart Options -> single dataset
function basicChartOptions(chartTitle, isLegend=true) {
    return {
        responsive: true,
        spanGaps: true,
        title: {
            display: true,
            position: 'bottom',
            text: chartTitle
        },
        legend: {
            display: isLegend,
            position: 'bottom'
        }
    }
} // END: basicChartOptions


// Chart Options -> Mult Datset
function setChartOptions(chartTitle,
                         xAxisRange,
                         xAxisTitle,
                         isLegend,
                         yaxisA_Title='',
                         yaxisB_Title='',
                         axisB=false) {
    return  {
        responsive: true,                       // Modify Chart based on canvas size
        spanGaps: true,                         // If no value (#N/A), span to next value
        title: {
            display: true,                      // Display Title
            position: 'bottom',                 // Title position
            text: selected_country + ': ' + chartTitle  // title text
        },
        legend: {
            display: isLegend,                  // Display Legend (toggle)
            position: 'bottom',                 // Legend position
        },
        scales: {
            xAxes: [{
                display: true,                  // Display X-Axis
                scaleLabel: {
                    display: true,              // Display X-Axis title
                    labelString: xAxisTitle     // X-Axis title
                },
                gridLines: {
                    display: true               // X-Axis Gridlines
                },
                ticks: {
                    min: xAxisRange[0],         // Set Range of X-Axis
                    max: xAxisRange[1],
                }
            }],
            yAxes: [{
                display: true,                 // Display Y-Axis 'A'
                id: 'A',
                type: 'linear',
                position: 'left',               // Position of axis
                scaleLabel: {
                    display: true,
                    labelString: yaxisA_Title,  // Y-Axis 'A' Title
                    fontSize: 10
                },
                gridLines: {
                    display: true,              // Display grid lines (toggle)
                    drawOnChartArea: true,      // Gridlines buffer
                }
            },{
                display: axisB,                 // Display Y-Axis 'B' (toggle)
                id: 'B',
                type: 'linear',
                position: 'right',
                scaleLabel: {
                    display: axisB,             // Display Y-Axis 'B' label (toggle)
                    labelString: yaxisB_Title,  // Y-Axis 'B' Title
                    fontSize: 10
                },
                gridLines: {
                    display: false,
                },
                ticks: {
                    //max: 80                 // Set Max of 2nd to Match 1st Axis
                }
            }]
        },
    };

} // END: setChartOptions


// Display Country Name to div
function displayCountryName(holder, countries) {
    if (countries.length === 1) {
        document.getElementById(holder).innerText = countries[0];
    } else if (countries.length > 1) {
        let headerString = '';
        if (countries[1] === '') {
            headerString = countries[0] + " &  ____________"
        } else {
            for (let i = 0; i < countries.length; i++) {
                headerString += countries[i] + " & ";
            }
        }
        document.getElementById(holder).innerText = headerString.substring(0, headerString.length - 3);
    }

} // END: displayCountryName

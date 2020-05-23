// File to run all scripts on load
// Global var for selected country -> default: United Kingdom
var selected_country = "United Kingdom";
var previous_country = "";

setAllData();   // Retrieve all data from csv and populate global var (collectData.js)

// Scripts to run on page load
function initialScript(pageName) {
    fillSearch();

    if (pageName === 'index') {
        buildDatamaps('worldMapMain');          // Build world Map [worldMap.js]
        homeCharts();                           // Build all charts [chartOptions.js]
        downloadOpt([
            ["download_Trade", "tradeCanvas"],
            ["download_Commodities", "commodCanvas"],
            ["download_Energy", "energyCanvas"],
            ["download_Emission", "emissionCanvas"]
            ]);
        changeClass('index');                   // Change class for nav
    } else if (pageName === 'comparison') {
        buildDatamaps('comparisonMap');         // Build world Map [worldMap.js]
        compCharts();
        changeClass('comparison');              // Change class for nav
    } else if (pageName === 'history') {
        countryList();                          // Scroll list of all countries
        countryDetails();                       // Country Details
        yearlyCharts();                         // Build yearly charts [chartOptions.js]
        changeClass('history');                 // Change class for nav
    }
} // END initialScript

// Fill Options of Search 
function fillSearch() {
    $(document).ready(function () {
        let options = [];
        // Loop through countryCodes/Names
        countryCode.forEach(function (item) {
            // Create and append option
            var option = "<option data-tokens='" + item.Code + "'>" + item.Country + "</option>";
            options.push(option);
        });

        // Append options & Refresh
        $('.selectpicker').html(options);
	    $('.selectpicker').selectpicker('refresh');

    })
}

// Set Download Options for charts
function downloadOpt(canvasNames) {
    // Loop through all canvases
    for (let i = 0; i < canvasNames.length; i++) {
        let elName = canvasNames[i][0].split('_')[1];  // Get Name
        // Get and set link in Dom
        let downLink = document.getElementById(canvasNames[i][0]);
        downLink.className = "btn btn-primary float-right bg-flat-color-1";
        downLink.download = elName + "Chart.png";
        downLink.href = "";
        downLink.title = elName + " Data Download";
        // Create and set donwload Img
        let downImg = document.createElement("img");
        downImg.src = "download.svg";
        downImg.setAttribute("width", "20em");
        downImg.setAttribute("height", "20em");
        downLink.appendChild(downImg);

        document.getElementById(canvasNames[i][0]).addEventListener('click', function() {
            let canvasImgUrl = document.getElementById(canvasNames[i][1]).toDataURL("image/png");
            let downBtn = document.getElementById(canvasNames[i][0]);
            downBtn.href = canvasImgUrl;
        });
    }
} // END: downloadOpt

// JQuerry - Fill Search [1st attempt, NOT working]
function _fillSearch() {
    let ul = document.getElementById('searchSelect');

    $.each(countryCode, function(code, country) {
        let li = document.createElement("option");
        let liText = document.createTextNode(code);
        li.appendChild(liText);
        ul.appendChild(li)
    });

    $('.selectpicker').selectpicker('refresh');
}


// JS - Fill Search [Not working]
function _fillSearchOptions() {
    let sOptions = "<option data-tokens='one'>One</option>";

    for (let i=0; i<countryCode.length; i++) {
        sOptions += "<option data-tokens='"+ countryCode[i].Code + "'>" + countryCode[i].Country + "</option>";
    }

    console.log(sOptions);
    document.getElementById('searchSelect').innerHTML = sOptions;

} // END: fillSearchOptions


// Change active class based on page
function changeClass(newActive) {
    let classNames = ['history', 'index', 'comparison'];        // Possible page tags
    document.getElementById(newActive).className += " active";  // Add 'active' to current page

    // Loop through all other tags and remove 'active'
    for (let i = 0; i < classNames.length; i++) {
        if (classNames[i] !== newActive) {
            document.getElementById(classNames[i]).className = document.getElementById(classNames[i]).className.replace(/(?:^|\s)active(?!\S)/g, '');
        }
    }
} // END: changeClass


// Create scroll countryList for History Page
function countryList() {
    let listDiv = document.getElementById('countryList');

    // Loop through all countries
    for (let i=0; i<Object.keys(tradeData).length; i++) {
        // Create link a
        let countryButton = document.createElement('a');
        // Get country name
        let countryName = document.createTextNode(tradeData[i].Country);
        // Append to countryLink & Div
        countryButton.appendChild(countryName);
        listDiv.appendChild(countryButton);
    } //END: for i<tradeData.length
} // END: countryList

// Bootstrap way for country list (scrolls all page)
function buildCountryList() {

} // END: buildCountryList

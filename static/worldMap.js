// Construct World Map using DataMaps library
// Main elements:
//      Function on user click -> update countries and charts
//      Hover Tooltip -> country name


function buildDatamaps(mapID) {
    var map = new Datamaps({
        scope: 'world',                             // type of map
        projection: 'equirectangular',                     // style of projection. option: mercator, orthographic, equirectangular
        element: document.getElementById(mapID),    // element to nest in
        responsive: true,                           // make map responsive to resive
        height: 500,                                // height of element, null takes height from 'element'
        width: null,
        // design elements of map
        geographyConfig: {
            // Hover text for country
            popupTemplate: function(geo) { return "<div class='hoverinfo'>" + geo.properties.name + "<div>"; },
            highlightFillColor: '#70C3FF',          // country color on highlight
            highlightBorderColor: '#61AACE',        // country border color
            highlightBorderWidth: 1,                // country border width
        },
        done: function(datamap) {
            // onclick, update selected_country & charts
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                if (mapID === 'worldMapMain') {
                    selected_country = geography.properties.name;   // update selected country
                    homeCharts();                                   // build Homepage charts (chartOptions.js)
                } else if (mapID === 'historyWorldMap') {
                    selected_country = geography.properties.name;
                    yearlyCharts();                                 // build History charts
                } else if (mapID === 'comparisonMap') {
                    previous_country = selected_country;            // update previous selected country
                    selected_country = geography.properties.name;
                    compCharts();                                   // build Comparison charts
                }
            });
        },
        fills: { defaultFill: '#3487D1' }           // default map color
    });

    // Resize map on window size change
    window.addEventListener('resize', function() {
        map.resize();
         console.log('resized');
    });
} //END buildDatamaps

//  Main file to build WorldMap using datamaps
// Functions:
//  buildDatamaps(mapID):
//      -> builds map at provided location. Called from DOM onload=""

// Global var for map
var dragMap;
// scope.rotation = [98, -30];     // Initial rotation of map

//TEMP to run redraw
var mapID='worldMapMain';

function redraw(mapID) {
    d3v3.select(mapID).html('');
    //buildDatamapsDrag(mapID);
}


// Build Datamaps
function buildDatamapsDrag(mapID) {
    dragMap = new Datamaps({
        scope: 'world',                             // type of map
        projection: 'mercator',                     // style of projection. option: mercator, orthographic, equirectangular
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
                selected_country = geography.properties.name;   // update selected country
                homeCharts();                                   // builds charts (chartOptions.js)
            });
        },
        fills: { defaultFill: '#3487D1' }           // default map color
    });

    // Atempt at making map drag when orthographic
    var drag = d3.behavior.drag().on('drag', function() {
        var dx = d3.event.dx;
        var dy = d3.event.dy;

        var rotation = projection.rotate();
        var radius = projection.scale();
        var scale = d3.scale.linear().domain([-1 * radius, radius]).range([-90,90]);
        var degX = scale(dx);
        var deyY = scale(dy);
        rotation[0] += degX;
        rotation[1] -= deyY;
        if (rotation[1] > 90) rotation[1] = 90;
        if (rotation[1] < -90) rotation[1] = -90;

        if (rotation[0] >= 180) rotation[0] -=360;
        projection.rotate(rotation);
        redraw(mapID);
    });
    d3.select(mapID).select("svg").call(drag);
} //END buildDatamaps

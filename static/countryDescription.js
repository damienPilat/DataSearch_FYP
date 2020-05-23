function countryDetails(){
    let countryData = getCountryData(countryPopulation, false);

    let desc = "The current population of " + selected_country + " is " + numberWithCommas(countryData[2020]) + " people." +
        "\nThe total country area is " + numberWithCommas(countryData["Area"]) + " km2 which makes it have a density of " +
        (countryData["Area"]/countryData[2020]*1000).toFixed(3) + " people per km2.";

    document.getElementById("countryDesc").innerHTML = desc;
}

// Change numbers to comma separated strings
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

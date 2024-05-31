// sliders and buttons
var carryoverSlider = document.getElementById("carryover-slider");
var minflowSlider = document.getElementById("minflow-slider");
var deltaRegSlider = document.getElementById("deltareg-slider");
var submitButton = document.getElementById("submit-button");

// reservoir text
var trinityResText = document.getElementById("trinity-res-text");
var shastaResText = document.getElementById("shasta-res-text");
var orovilleResText = document.getElementById("oroville-res-text");
var folsomResText = document.getElementById("folsom-res-text");
var newMelonesResText = document.getElementById("new-melones-res-text");
var millertonResText = document.getElementById("millerton-res-text");

// demands text
var citiesNODText = document.getElementById("cities-NOD-demand-text");
var citiesSODText = document.getElementById("cities-SOD-demand-text");
var farmsNODText = document.getElementById("farms-NOD-demand-text");
var farmsSODText = document.getElementById("farms-SOD-demand-text");
var refugesText = document.getElementById("refuges-demand-text");

//misc text
var deltaSalinityText = document.getElementById("delta-salinity-text");
var groundwaterUsageText = document.getElementById("groundwater-usage-text");
var rainForecastText = document.getElementById("rain-forecast-text");
var currYearText = document.getElementById("curr-year-text");


var dataState = {
    //levers
    carryover: 100,
    minflow: 0,
    deltaRegs: 100,
    //reservoirs
    trinityLevel: 0,
    shastaLevel: 0,
    orovilleLevel: 0,
    folsomLevel: 0,
    newMelonesLevel: 0,
    millertonLevel: 0,
    //demands
    citiesNOD: 0,
    citiesSOD: 0,
    farmsNOD: 0,
    farmsSOD: 0,
    refuges: 0,
    //misc
    deltaSalinity: 0,
    groundwaterUsage: 0,
    annualRainfall: 0,
    rainForecast: 0,
    currYear: -1,
}

startNewYear();


function startNewYear() {
    dataState.currYear += 1;
    currYearText.innerHTML = "Current Year: " + dataState.currYear;

    dataState.annualRainfall = dataState.rainForecast;
    dataState.rainForecast = Math.floor(Math.random() * 50);
    rainForecastText.innerHTML = "Rainfall Forecast: " + dataState.rainForecast;

    carryoverSlider.value = 100;
    dataState.carryover = 100;
    minflowSlider.value = 0;
    dataState.minflow = 0;
    deltaRegSlider.value = 100
    dataState.deltaRegs = 100;


    updateState();

}

function updateState() {
    
    const reservoirLevels = dataState.carryover - (dataState.minflow) + ((100 - dataState.deltaRegs) *0.5) + dataState.annualRainfall;
    const demandLevels = (100 - dataState.carryover) - (dataState.minflow) + ((100 - dataState.deltaRegs) *0.5);
    const salinityLevel = (100 - dataState.deltaRegs) - (dataState.minflow) + (dataState.carryover *0.5);
    const groundwaterUsage = 100 - demandLevels - (dataState.annualRainfall * 0.1);

    dataState.trinityLevel = reservoirLevels;
    dataState.shastaLevel = reservoirLevels;
    dataState.orovilleLevel = reservoirLevels;
    dataState.folsomLevel = reservoirLevels;
    dataState.newMelonesLevel = reservoirLevels;
    dataState.millertonLevel = reservoirLevels;

    dataState.citiesNOD = demandLevels;
    dataState.citiesSOD = demandLevels;
    dataState.farmsNOD = demandLevels;
    dataState.farmsSOD = demandLevels;
    dataState.refuges = demandLevels;

    dataState.deltaSalinity = salinityLevel;
    dataState.groundwaterUsage = groundwaterUsage;
    updateText();
}

function updateText() {
    // reservoirs
    trinityResText.innerHTML = "Trinity: " + dataState.trinityLevel + "%";
    shastaResText.innerHTML = "Shasta: " + dataState.shastaLevel + "%";
    orovilleResText.innerHTML = "Oroville: " + dataState.orovilleLevel + "%";
    folsomResText.innerHTML = "Folsom: " + dataState.folsomLevel + "%";
    newMelonesResText.innerHTML = "New Melones: " + dataState.newMelonesLevel + "%";
    millertonResText.innerHTML = "Millerton: " + dataState.millertonLevel + "%";
    
    // demands
    citiesNODText.innerHTML = "Cities (NOD): " + dataState.citiesNOD + "%";
    citiesSODText.innerHTML = "Cities (SOD): " + dataState.citiesSOD + "%";
    farmsNODText.innerHTML = "Farms (NOD): " + dataState.farmsNOD + "%";
    farmsSODText.innerHTML = "Farms (SOD): " + dataState.farmsSOD + "%";
    refugesText.innerHTML = "Refuges: " + dataState.refuges + "%";

    //misc
    // console.log(dataState.deltaSalinity);
    deltaSalinityText.innerHTML = "Delta Salinity: " + dataState.deltaSalinity + "%";
    groundwaterUsageText.innerHTML = "Groundwater Usage: " + dataState.groundwaterUsage;


}

// ----------------------------------------------------------------------------
// SLIDERS AND BUTTONS
// ----------------------------------------------------------------------------

carryoverSlider.oninput = function() {
    console.log("carryover: "+ this.value);
    dataState.carryover = this.value
    updateState();
}


minflowSlider.oninput = function() {
    console.log("min flow: "+ this.value);
    dataState.minflow = this.value
    updateState();

}


deltaRegSlider.oninput = function() {
    console.log("delta regs: "+ this.value);
    dataState.deltaRegs = this.value
    updateState();

}

submitButton.onclick = function() {
    startNewYear();
}

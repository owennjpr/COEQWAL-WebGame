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

// misc text
var deltaSalinityText = document.getElementById("delta-salinity-text");
var groundwaterUsageText = document.getElementById("groundwater-usage-text");
var rainForecastText = document.getElementById("rain-forecast-text");
var currYearText = document.getElementById("curr-year-text");

var ds = {
    //levers
    carryover: 100,
    minflow: 0,
    deltaRegs: 100,

    //reservoirs
    trinityStart: 100,
    shastaStart: 100,
    orovilleStart: 100,
    folsomStart: 100,
    newMelonesStart: 100,
    millertonStart: 100,

    trinityLevel: 100,
    shastaLevel: 100,
    orovilleLevel: 100,
    folsomLevel: 100,
    newMelonesLevel: 100,
    millertonLevel: 100,
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
    ds.currYear += 1;
    currYearText.innerHTML = "Current Year: " + ds.currYear;

    ds.annualRainfall = ds.rainForecast;

    ds.rainForecast = Math.floor(Math.random() * 50);
    rainForecastText.innerHTML = "Rainfall Forecast: " + ds.rainForecast;

    ds.trinityStart = ds.trinityLevel + ds.annualRainfall;
    ds.shastaStart = ds.shastaLevel + ds.annualRainfall;
    ds.orovilleStart = ds.orovilleLevel + ds.annualRainfall;
    ds.folsomStart = ds.folsomLevel + ds.annualRainfall;
    ds.newMelonesStart = ds.newMelonesLevel + ds.annualRainfall;
    ds.millertonStart = ds.millertonLevel + ds.annualRainfall;

    carryoverSlider.value = 100;
    ds.carryover = 100;
    minflowSlider.value = 0;
    ds.minflow = 0;
    deltaRegSlider.value = 100
    ds.deltaRegs = 100;


    updateState();

}

function updateState() {
    
    const reservoirLevels = calculateReservoirLevels(ds.carryover, ds.minflow, ds.deltaRegs);
    const demandLevels = calculateDemandLevels(ds.carryover, ds.minflow, ds.deltaRegs);
    const salinityLevel = calculateSalinityLevels(ds.carryover, ds.minflow, ds.deltaRegs);
    const groundwaterUsage = 100 - demandLevels - (ds.annualRainfall * 0.1);

    ds.trinityLevel = Math.min(reservoirLevels.trinity, 100);
    ds.shastaLevel = Math.min(reservoirLevels.shasta, 100);
    ds.orovilleLevel = Math.min(reservoirLevels.oroville, 100);
    ds.folsomLevel = Math.min(reservoirLevels.folsom, 100);
    ds.newMelonesLevel = Math.min(reservoirLevels.newMelones, 100);
    ds.millertonLevel = Math.min(reservoirLevels.millerton, 100);

    ds.citiesNOD = demandLevels;
    ds.citiesSOD = demandLevels;
    ds.farmsNOD = demandLevels;
    ds.farmsSOD = demandLevels;
    ds.refuges = demandLevels;

    ds.deltaSalinity = salinityLevel;
    ds.groundwaterUsage = groundwaterUsage;
    updateText();
}

function updateText() {
    // reservoirs
    trinityResText.innerHTML = "Trinity: " + (Math.round(ds.trinityLevel * 100) / 100) + "%";
    shastaResText.innerHTML = "Shasta: " + (Math.round(ds.shastaLevel * 100) / 100) + "%";
    orovilleResText.innerHTML = "Oroville: " + (Math.round(ds.orovilleLevel * 100) / 100) + "%";
    folsomResText.innerHTML = "Folsom: " + (Math.round(ds.folsomLevel * 100) / 100) + "%";
    newMelonesResText.innerHTML = "New Melones: " + (Math.round(ds.newMelonesLevel * 100) / 100) + "%";
    millertonResText.innerHTML = "Millerton: " + (Math.round(ds.millertonLevel * 100) / 100) + "%";
    
    // demands
    citiesNODText.innerHTML = "Cities (NOD): " + ds.citiesNOD + "%";
    citiesSODText.innerHTML = "Cities (SOD): " + ds.citiesSOD + "%";
    farmsNODText.innerHTML = "Farms (NOD): " + ds.farmsNOD + "%";
    farmsSODText.innerHTML = "Farms (SOD): " + ds.farmsSOD + "%";
    refugesText.innerHTML = "Refuges: " + ds.refuges + "%";

    //misc
    // console.log(ds.deltaSalinity);
    deltaSalinityText.innerHTML = "Delta Salinity: " + ds.deltaSalinity + "%";
    groundwaterUsageText.innerHTML = "Groundwater Usage: " + ds.groundwaterUsage;
}

// ----------------------------------------------------------------------------
// Math Equations
// ----------------------------------------------------------------------------
function calculateReservoirLevels(carryover, minflow, deltaregs) {
    return {
        trinity: (ds.trinityStart * (carryover / 100)) - (minflow) + ((100 - deltaregs) *0.5),
        shasta: (ds.shastaStart * (carryover / 100)) - (minflow) + ((100 - deltaregs) *0.5),
        oroville: (ds.orovilleStart * (carryover / 100)) - (minflow) + ((100 - deltaregs) *0.5),
        folsom: (ds.folsomStart * (carryover / 100)) - (minflow) + ((100 - deltaregs) *0.5),
        newMelones: (ds.newMelonesStart * (carryover / 100)) - (minflow) + ((100 - deltaregs) *0.5),
        millerton: (ds.millertonStart * (carryover / 100)) - (minflow) + ((100 - deltaregs) *0.5),
    };
}

function calculateDemandLevels(carryover, minflow, deltaregs) {

    return (100 - carryover) - (minflow) + ((100 - deltaregs) *0.5);;
}

function calculateSalinityLevels(carryover, minflow, deltaregs) {

    return (100 - deltaregs) - (minflow) + (carryover *0.5);;
}


// ----------------------------------------------------------------------------
// SLIDERS AND BUTTONS
// ----------------------------------------------------------------------------

function validateNewState(newCarryover, newMinflow, newDeltaRegs) {
    const newReservoirLevels = calculateReservoirLevels(newCarryover, newMinflow, newDeltaRegs);
    const newDemandLevels = calculateDemandLevels(newCarryover, newMinflow, newDeltaRegs);
    return newReservoirLevels.trinity >= 0 && newReservoirLevels.trinity <= 100 && newDemandLevels >= 0 && newDemandLevels <= 100;
}


carryoverSlider.oninput = function() {
    // console.log("carryover: "+ this.value);
    const newCarryover = this.value;
    if (validateNewState(newCarryover, ds.minflow, ds.deltaRegs)) {
        ds.carryover = newCarryover;
        updateState();    
    } else {
        carryoverSlider.value = ds.carryover;
    }
}


minflowSlider.oninput = function() {
    // console.log("min flow: "+ this.value);
    const newMinflow = this.value;
    if (validateNewState(ds.carryover, newMinflow, ds.deltaRegs)) {
        ds.minflow = newMinflow;
        updateState();    
    } else {
        minflowSlider.value = ds.minflow;
    }
}


deltaRegSlider.oninput = function() {
    // console.log("delta regs: "+ this.value);
    const newDeltaRegs = this.value;
    if (validateNewState(ds.carryover, ds.minflow, newDeltaRegs)) {
        ds.deltaRegs = newDeltaRegs;
        updateState();    
    } else {
        deltaRegSlider.value = ds.deltaRegs;
    }
}

submitButton.onclick = function() {
    startNewYear();
}

const possibleUnits = {
    temp : ["C", "F", "K"],
    wind : ["km/h", "m/h"],
};

function init() {
    let temperatures = getTemperatures();
    const units = JSON.parse(localStorage.chosen_units);
    temperatures = convertTemperatures(temperatures, units);
    setTemperatures(temperatures, units);
}

function setTemperatures(temperatures, units) {
    const temp_elements = document.getElementsByClassName("temperature");
    Array.prototype.forEach.call(temp_elements, function(el, index) {
        el.innerHTML = temperatures[index][0] + "-" + temperatures[index][1] + "°" + possibleUnits.temp[units.temp];
    });
}

function convertTemperatures(temperatures, units) {
    temperatures.forEach(function(temperature, i) {
        switch (units.temp) {
            case 0:
                break;
            case 1:
                this[i][0] = Math.round(this[i][0] * 9 / 5 + 32);
                this[i][1] = Math.round(this[i][1] * 9 / 5 + 32);
                break;
            case 2:
                this[i][0] = this[i][0] + 273;
                this[i][1] = this[i][1] + 273;
                break;
        }
    }, temperatures);
    return temperatures;
}

function getTemperatures() {
    return [[5, 12], [2, 9], [5, 9], [5, 10]]
}

window.onload=function(){
    init();
};

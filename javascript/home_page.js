const possibleUnits = {
    temp : ["C", "F", "K"],
};

function init() {
    let units = {};
    try {
        units = JSON.parse(localStorage.units);
    }
    catch(error) {
        units = {
            temp : 0,
            time_format : 0
        }
    }
    const temperatures = convertTemperatures(getTemperatures(), units);
    const times = convertTime(getHours(), units);
    setTemperatures(temperatures);
    setTimes(times);
}

function setTemperatures(temperatures) {
    const temp_elements = document.getElementsByClassName("temperature");
    Array.prototype.forEach.call(temp_elements, function(el, index) {
        el.innerHTML = temperatures[index];
    });
}

function setTimes(times) {
    console.log(times);
    const time_elements = document.getElementsByClassName("time");
    Array.prototype.forEach.call(time_elements, function(el, index) {
        el.innerHTML = times[index];
    });
}

function convertTemperatures(temperatures, units) {
    let temp_converted = [];
    temperatures.forEach(function(temperature, i) {
        let temps = "";
        switch (units.temp) {
            case 0:
                temps = temperature[0].toString() + "-" +
                    temperature[1].toString() + "°" + possibleUnits.temp[units.temp];
                break;
            case 1:
                temps = Math.round(temperature[0] * 9 / 5 + 32).toString() + "-" +
                    Math.round(temperature[1] * 9 / 5 + 32).toString() + "°" + possibleUnits.temp[units.temp];
                break;
            case 2:
                temps = (temperature[0] + 273).toString() + "-" +
                    (temperature[1] + 273).toString() + "°" + possibleUnits.temp[units.temp];
                break;
        }
        this.push(temps);
    }, temp_converted);
    return temp_converted;
}

function convertTime(hours, units) {
    let hours_str = [];
    hours.forEach(function(hour, i) {
        if (units.time_format === 1) {
            const meridiem = hour[0] > 12? " PM" : " AM";
            const hour_str = (hour[0] - 1) % 12 + 1;
            this.push(hour_str.toString() + "h" + hour[1] + meridiem)
        }
        else {
            this.push(hour[0] + "h" + hour[1]);
        }
    }, hours_str);
    return hours_str;
}

function getTemperatures() {
    return [[5, 12], [2, 9], [5, 9], [5, 10]]
}

function getHours() {
    return [[8, 52], [17, 53], [22, 45]]
}

window.onload=function(){
    init();
};

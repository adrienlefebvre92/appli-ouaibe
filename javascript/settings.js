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
    const save_button = document.getElementById("save_button");
    save_button.addEventListener("click", function (e) {
        saveSettings(units);
    });
    document.getElementById("celcius").checked = units.temp === 0;
    document.getElementById("farenheit").checked = units.temp === 1;
    document.getElementById("kelvin").checked = units.temp === 2;
    document.getElementById("24h").checked = units.time_format === 0;
    document.getElementById("12h").checked = units.time_format === 1;
}

function saveSettings(units) {
    const celcius_checkbox = document.getElementById("celcius");
    const farenheit_checkbox = document.getElementById("farenheit");
    const kelvin_checkbox = document.getElementById("kelvin");
    const format_24h_checkbox = document.getElementById("24h");
    const format_12h_checkbox = document.getElementById("12h");
    units.temp = celcius_checkbox.checked * 0 + farenheit_checkbox.checked * 1 + kelvin_checkbox.checked * 2;
    units.time_format = format_24h_checkbox.checked * 0 + format_12h_checkbox.checked * 1;
    localStorage.setItem("units", JSON.stringify(units));
    console.log(units);
}

window.onload=function(){
    init();
};

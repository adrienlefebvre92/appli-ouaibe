function init() {
    const stored_chosen_units = localStorage.chosen_units;
    if (stored_chosen_units) {
        chosen_units = JSON.parse(stored_chosen_units);
    }
    const save_button = document.getElementById("save_button");
    save_button.addEventListener("click", function (e) {
        saveSettings();
    });
    document.getElementById("celcius").checked = chosen_units.temp === 0;
    document.getElementById("farenheit").checked = chosen_units.temp === 1;
    document.getElementById("kelvin").checked = chosen_units.temp === 2;
    document.getElementById("kmh").checked = chosen_units.wind === 0;
    document.getElementById("mph").checked = chosen_units.wind === 1;
}

function saveSettings() {
    const celcius_checkbox = document.getElementById("celcius");
    const farenheit_checkbox = document.getElementById("farenheit");
    const kelvin_checkbox = document.getElementById("kelvin");
    const kmh_checkbox = document.getElementById("kmh");
    const mph_checkbox = document.getElementById("mph");
    chosen_units.temp = celcius_checkbox.checked * 0 + farenheit_checkbox.checked * 1 + kelvin_checkbox.checked * 2;
    chosen_units.wind = kmh_checkbox.checked * 0 + mph_checkbox.checked * 1;
    localStorage.setItem("chosen_units", JSON.stringify(chosen_units));
    console.log(chosen_units);
}

window.onload=function(){
    init();
};
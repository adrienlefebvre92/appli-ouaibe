// var ol = require('https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js')

var unitesPossibles = {
    temp : ["C", "F", "K"],
    vent : ["km/h", "m/s"],
    visib : ["km", "m"],
    pression : ["hPa", "bar"]
}

var unitesChoisies = {
    temp : 0,
    vent : 0,
    visib : 0,
    pression : 0
}

var valeursCourantes = {
    temp : -42,
    vent : 100,
    visib : 5,
    pression : 1000,
    nuage : "gris"
}

var villeCourante = {
    nom : "Gif-Sur-Yvette",
    pays: "Fr"
}

var config = {
    "temp": {
        "unite": 0,
        "state": 1
    },
    "pression": {
        "unite": 0,
        "state": 0
    },
    "nuage": {
        "visib": {
            "unite": 1,
            "state": 1
        },
        "status": 1
    },
    "vent": {
        "unite": 0,
        "state": 1
    }
};

function valeurVent() {
    if (unitesChoisies.vent == 0) {
        return valeursCourantes.vent;
    } else {
        return valeursCourantes.vent / 3.6;
    }
}

function valeurPression() {
    if (unitesChoisies.pression == 0) {
        return valeursCourantes.pression;
    } else {
        return valeursCourantes.pression / 1000;
    }
}

function valeurTemp() {
    if (unitesChoisies.temp == 0) {
        return valeursCourantes.temp;
    } else if (unitesChoisies.temp == 1) {
        return (valeursCourantes.temp * 9 / 5) + 32;
    } else {
        return valeursCourantes.temp + 273.15;
    }
}

function valeurVisib() {
    if (unitesChoisies.visib == 0) {
        return valeursCourantes.visib;
    } else {
        return valeursCourantes.visib / 1000;
    }
}


function afficher() {
    $("#vent").find(".contenu").text(valeurVent());
    $("#vent").find(".unite").text(unitesPossibles.vent[unitesChoisies.vent]);

    $("#pression").find(".contenu").text(valeurPression());
    $("#pression").find(".unite").text(unitesPossibles.pression[unitesChoisies.pression]);

    $("#temp").find(".contenu").text(valeurTemp());
    $("#temp").find(".unite").text(unitesPossibles.temp[unitesChoisies.temp]);

    $("#visib").find(".contenu").text(valeurVisib());
    $("#visib").find(".unite").text(unitesPossibles.visib[unitesChoisies.visib]);

    $("#ville").text(villeCourante.nom);
    

    $("#nuage").find(".contenu").text(valeursCourantes.nuage);
}


function cacher() {
    $(".contenant").hide();
}

function montrer(liste) {
    for(var i = 0; i < liste.length; ++i) {
        $("#" + liste[i]).show();
    }
}

function litDonnees(callback){
    getDataAsync();
    callback();
}

function litConfig(callback){
    Object.entries(config).forEach(([key, value]) => {
        if (key === "nuage"){
            unitesChoisies.visib = value.visib.unite;
            if (value.status) {
                $("#" + key).show()
            }
            else {
                $("#" + key).hide()
            }
            if (value.visib.state) {
                $("#" + key).show()
            }
            else {
                $("#" + key).hide()
            }
        }
        else {
            if (value.state) {
                $("#" + key).show()
            }
            else {
                $("#" + key).hide()
            }
            unitesChoisies[key] = value.unite;
        }
    });
    callback();
}

function traiteErreur(jqXHR, textStatus, errorThrown) {
    alert("Erreur " + errorThrown + " : " + textStatus);
}

function getDataAsync() { 
    q = villeCourante.nom + ","+ villeCourante.pays;

    $.ajax({
        url : "http://api.openweathermap.org/data/2.5/weather",
        data : { 
            q,
            appid : "22e21ef649526ef2b1be4db6d2b0857d",
            mode : "json",
            lang : 'fr',
            units: 'metric' 
        },
        dataType : "json",
        success : onDataFetched,
        error : traiteErreur
    });
}

function onDataFetched(ville) {    
    console.log(ville);

    const { temp, humidity, pressure } = ville.main;
    const { coord } = ville;

    const visibility = ville.visibility / 1000;
    const vent = ville.wind.speed / 3.6;
    const nuage = ville.weather[0].description;

    const icon = ville.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    valeursCourantes = {
        temp,
        nuage,
        pression: pressure,
        vent: vent,
        visib: visibility,
    };

    afficher();
    afficheMap(iconUrl, coord);
}

function afficheMap(iconUrl, coord) {
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

    var lat1           = coord.lat;
    var lon1           = coord.lon;
    var position1      = new OpenLayers.LonLat(lon1, lat1).transform( fromProjection, toProjection);

    $("#uneJoliCarte").empty();
    map = new OpenLayers.Map("uneJoliCarte");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);

    var size = new OpenLayers.Size(100,100);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon(iconUrl, size, offset);

    var marker1 = new OpenLayers.Marker(position1, icon.clone());

    var markers = new OpenLayers.Layer.Markers();
    map.addLayer(markers);
    markers.addMarker(marker1);

    var zoom = 10;
    map.setCenter(position1, zoom);
  }

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

function litDonnees(){
    $.get("meteo.xml", function(xmlDocument) {
        Object.keys(valeursCourantes).forEach(function (key) {
            if (key === "visib"){
                valeursCourantes[key] = $(xmlDocument).find("nuage").attr("visibilite");
            }
            else if (key === "nuage"){
                valeursCourantes[key] = $(xmlDocument).find("description").text();
            }
            else {
                valeursCourantes[key] = $(xmlDocument).find(key).text();
            }
        });
    });
    afficher();
}

function litConfig(){
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
    afficher();
}
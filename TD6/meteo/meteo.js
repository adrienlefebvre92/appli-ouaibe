var unitesPossibles = {
    temp : ["C", "F", "K"],
    vent : ["km/h", "m/s"],
    visib : ["m","km"],
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
        return (valeursCourantes.visib * 1000);
    }
}


function miseAjourValeurs(callback) {
    console.log("eee");
    return function(xmldoc) {
        // On met a jour les valeurs
        
        valeursCourantes.temp = parseInt($(xmldoc).find("temperature").attr("value"));
        valeursCourantes.vent = parseInt($(xmldoc).find("wind").find("speed").attr("value"));
        valeursCourantes.visib = parseInt($(xmldoc).find("visibility").attr("value"));
        valeursCourantes.pression = parseInt($(xmldoc).find("pressure").attr("value"));
        valeursCourantes.nuage = $(xmldoc).find("clouds").attr("name");
        
        // quand on a fini on appelle la fonction qui dit quoi faire apres.
        
        callback();
    };
}

function processError(jqXHR, textStatus, errorThrown) {
  console.log(errorThrown + " : " + textStatus);
}

function litDonnees(callback) {
    $.ajax({
        url : "http://api.openweathermap.org/data/2.5/weather",
        data : { q : "Gif-Sur-Yvette,fr", appid : "22e21ef649526ef2b1be4db6d2b0857d", mode : "xml", units: "metric", lang: "fr"},
        dataType: "xml",
        type: "GET",
        success: miseAjourValeurs(callback),
        error: processError,
    });
}

function litConfig(callback) {
    $.get("/config", function (jsondoc) {
        
        // On met a jour les valeurs
        
        unitesChoisies.temp = jsondoc.temp.unite;
        unitesChoisies.vent = jsondoc.vent.unite;
        unitesChoisies.visib = jsondoc.nuage.visib.unite;
        unitesChoisies.pression = jsondoc.pression.unite;

        // On montre et cache les champs
        
        if (jsondoc.temp.state == 1) $("#temp").show();
        else $("#temp").hide();

        if (jsondoc.vent.state == 1) $("#vent").show();
        else $("#vent").hide();
        
        if (jsondoc.vent.state == 1) $("#visib").show();
        else $("#visib").hide();

        if (jsondoc.pression.state == 1) $("#pression").show();
        else $("#pression").hide();
        
        if (jsondoc.nuage.status == 1) $("#nuage").show();
        else $("#nuage").hide();
        
        // Quand on a fini on appelle la fonction qui dit quoi faire apres.
        
        callback();
    },"json");
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


// On combine la lecture des fichiers XML et JSON et on affiche
function combine() {
    litConfig(function (){
        litDonnees(function () {
            afficher();
        });
    });
}

$(document).ready(combine);


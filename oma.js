// Haetaan tehtävä 1:sen JSON-data
fetch('https://run.mocky.io/v3/eed74f57-da7d-4f43-8e51-73ee8357f921')
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        tehtava1Data(responseJson);
    })
    .catch(function(error) {
        document.getElementById("kurssi").innerHTML = 
            "<p>Kurssin tietoa ei pystytä hakemaan</p>";
    });

// Haetaan tehvävä 2:sen JSON-data
fetch('https://run.mocky.io/v3/14996777-6170-490e-abde-caf037841146')
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        tehtava2Data(responseJson);
    })
    .catch(function(error) {
        document.getElementById("toteutus").innerHTML = 
            "<p>Toteutuksen tietoa ei pystytä hakemaan</p>";
    });

//tehtävä 3, Tampereen tapahtumat
fetch('https://api.visittampere.com/api/v1/eventztoday/event/all/?lang=fi&limit=5')
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        tehtava3Data(responseJson);
    })
    .catch(function(error) {
        document.getElementById("tapahtumat").innerHTML = 
            "<p>Tapahtumien tietoa ei pystytä hakemaan</p>";
    });

//Tehtävä 4
//Sää, Helsinki
fetch('https://api.openweathermap.org/data/2.5/weather?lang=fi&q=helsinki&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28')
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        tehtava4Data(responseJson, "saaHelsinki");
    })
    .catch(function(error) {
        document.getElementById("saaHelsinki").innerHTML = 
            "<p>Helsingin sään tietoja ei pystytä hakemaan</p>";
    });

//Sää, Tampere
    fetch('https://api.openweathermap.org/data/2.5/weather?lang=fi&q=tampere&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28')
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        tehtava4Data(responseJson, "saaTampere");
    })
    .catch(function(error) {
        document.getElementById("saaTampere").innerHTML = 
            "<p>Tampereen sään tietoja ei pystytä hakemaan</p>";
    });


// Tehvävaä 1, Kurssi
function tehtava1Data(data) {
    var teksti = "";
    teksti += "<h1>" + data.otsikko + "</h1>";
    teksti += "<p>" + data.kuvaus + "</p>";
    teksti += "<p><img src='" + data.kuva + "' alt='kuva' ></p>";
    teksti += "<h3>Opintojakso: " + data.opintojakso.nimi + " " + data.opintojakso.tunnus + " " + data.opintojakso.opintopisteet + "</h3>";
    
    // Sisältö luetteloituna
    teksti += "<ul>";
    for (var i = 0; i < data.sisalto.length; i++) {
        teksti += "<li>" + data.sisalto[i] + "</li>";
    }
    teksti += "</ul>";

    // Tekniikat ja linkit luetteloituna
    teksti += "<h3>Linkit</h3>";
    teksti += "<ul>";
    for (var i = 0; i < data.tekniikat.length; i++) {
        teksti += "<li>" + data.tekniikat[i].aihe + ", <a href='" + data.tekniikat[i].linkki + "'>" + data.tekniikat[i].linkki + "</a></li>";
    }
    teksti += "</ul>";

    document.getElementById("kurssi").innerHTML = teksti;
}

// Tehtävä 2, Toteutus
function tehtava2Data(data) {
    var teksti = "";
    teksti += "<p><img src='" + data.kuva + "' alt='kuva' ></p>";
    teksti += "<h1>" + data.otsikko + "</h1>";    
    teksti += "<p><strong>Aloitus: </strong>" + data.aloituspvm + "</p>";
    teksti += "<p><strong>Lopetus: </strong>" + data.lopetuspvm + "</p>";
    teksti += "<p><strong>Kesto: </strong>" + data.kesto_viikkoina + "</p>";
    teksti += "<p><strong>Osallistujia: </strong>" + data.osallistujien_lkm + "</p>";
   
    // Osallistujat luetteloituna
    teksti += "<h2>Ilmoittautuneet</h2><ul>";
    for (var i = 0; i < data.nimitiedot.length; i++) {
        var osallistuja = data.nimitiedot[i];
        teksti += "<li>" + osallistuja.etunimi + " " + osallistuja.sukunimi + "</li>";
    }
    teksti += "</ul>";

    document.getElementById("toteutus").innerHTML = teksti;
}

// Tehtävä 3, Tapahtumat
function tehtava3Data(data) {
    var teksti = "";
    teksti = "<h1>Tampereella tapahtuu</h1>";
    for (var i = 0; i < data.length; i++) {
      teksti = teksti + "<h3>" + data[i].name + "</h3>";
      teksti = teksti + "<p>" + data[i].description + "</p>";
      teksti = teksti + "<p> <a href=" + data[i].url + ">" + data[i].url + "</a></p>";
    }
document.getElementById("tapahtumat").innerHTML = teksti;
}

//Tehtävä 4, Sää

function tehtava4Data(data, elementId){
    var teksti = ""; // määritellään muuttuja, johon tulostettava tieto kerätään
    
    // Otsikkotiedon hakeminen ja sijoittaminen h1-elementtiin
    teksti = "<h2>" + data.name + "</h2>";
    
    // Säätilan haku
    var kuvaus = data.weather[0].description;
    teksti = teksti + "<p>Säätila: " + kuvaus + "</p>";
    
    // Lämpötilan haku
    var lampotila = data.main.temp;
    teksti = teksti + "<p>Lämpötila: " + lampotila + " &deg;C</p>";
    
    // Tuulen nopeuden haku
    var tuuli = data.wind.speed;
    teksti = teksti + "<p>Tuulen nopeus: " + tuuli + " m/s</p>";
    
    // Kuvan haku
    var kuva = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    teksti = teksti + "<p><img src='" + kuva + "' alt='Säätilan kuva'></p>";
    
    // teksti-muuttujan sisällön tulostus 
    document.getElementById(elementId).innerHTML = teksti;
}

